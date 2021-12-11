import axios from 'axios';
import { loremIpsum } from "lorem-ipsum";
import { useCallback, useEffect, useState } from 'react';

import { getGigById } from 'api/gigs';
import { getResumesByUserId } from 'api/resumes';
import employers from 'mock/employers.json';
import titles from 'mock/titles.json';
import UserContext from 'providers/user/context';
import settings from 'settings';
import {
  EmployerReview, Gig, GigApplicationStatus, PopulatedUserGigApplication, Resume, User,
} from 'types';
import generateUUID from 'utils/generateGUID';
import getRandomValueFromList from 'utils/getRandomValueFromList';

const UserProvider = (props: object) => {
  const [activeGig, setActiveGig] = useState<Gig | undefined>();
  const [activeResumeId, setActiveResumeId] = useState<string | undefined>(undefined);
  const [favoriteGigs, setFavoriteGigs] = useState<Gig[]>([]);
  const [gigApplications, setGigApplications] = useState<PopulatedUserGigApplication[]>([]);
  const [resumes, setResumes] = useState<Resume[] | undefined>();

  useEffect(() => {
    const localActiveResumeId = window.localStorage.getItem('activeResumeId');
    if (localActiveResumeId) setActiveResumeId(localActiveResumeId);
    // eslint-disable-next-line
  }, []);

  const getUserById = useCallback(async (userId: string): Promise<User | undefined> => {
    const response = await axios.get(`${settings.BASE_SERVER_URL}/users?id=${userId}`);
    if (response?.data?.length) {
      return response.data[0];
    }
    return undefined;
  }, [])

  const getFavoriteGigs = useCallback(async (userId: string) => {
    const response = await axios.get(`${settings.BASE_SERVER_URL}/userGigs?userId=${userId}`);
    let userGigs = await Promise.all<Gig>(
      response.data.map(userGig => getGigById(userGig.gigId))
    );
    userGigs = userGigs.map(userGig => {
      userGig.favoriteGigId = response.data.find(
        favoriteGig => favoriteGig.gigId === userGig.id,
      ).id;
      return userGig;
    })
    setFavoriteGigs(userGigs);
  }, []);

  const getResumes = useCallback(async (userId: string) => {
    const resumesByUserId = await getResumesByUserId(userId);
    setResumes(resumesByUserId);
  }, []);

  const getGigApplications = useCallback(async (userId: string) => {
    const response = await axios.get(
      `${settings.BASE_SERVER_URL}/userGigApplications?userId=${userId}`
    );
    const gigs = await Promise.all<Gig>(
      response.data.map(userGigApplication => getGigById(userGigApplication.gigId))
    );
    const userGigApplications = response.data.map(userGigApplication => {
      userGigApplication.gig = gigs.find(gig => gig.id === userGigApplication.gigId);
      delete userGigApplication.gigId;
      return userGigApplication;
    })
    setGigApplications(userGigApplications);
  }, []);

  const toggleFavoriteGig = useCallback(async (userId: string, gigId: string) => {
    const response = await axios.get(
      `${settings.BASE_SERVER_URL}/userGigs?userId=${userId}&gigId=${gigId}`
    );
    if (response?.data?.length) {
      await axios.delete(`${settings.BASE_SERVER_URL}/userGigs/${response.data[0].id}`);
      setFavoriteGigs(favoriteGigs?.filter(favoriteGig => favoriteGig.id !== gigId));
    } else {
      await axios.post(
        `${settings.BASE_SERVER_URL}/userGigs`, { id: generateUUID(), userId, gigId }
      );
      const favoritedGig = await axios.get(
        `${settings.BASE_SERVER_URL}/gigs?id=${gigId}`
      );
      setFavoriteGigs([...favoriteGigs, favoritedGig.data[0]]);
    }
  }, [favoriteGigs, setFavoriteGigs]);

  const generateRandomExperience = () => {
    const highlights = loremIpsum({
      count: 3,
      format: 'plain',
      random: Math.random,
      sentenceLowerBound: 3,
      sentenceUpperBound: 5,
      units: 'sentences',
    });

    return {
      title: getRandomValueFromList(titles),
      employer: getRandomValueFromList(employers),
      highlights,
    }
  }

  const applyToGig = useCallback(async (userId: string, gigId: string) => {
    if (activeResumeId) {
      const gig = await getGigById(gigId);
      const user = await getUserById(userId);
      const response = await axios.post(
        `${settings.BASE_SERVER_URL}/userGigApplications`,
        {
          id: generateUUID(),
          employer: gig.employer,
          gigId,
          candidate: user,
          currentPosition: generateRandomExperience(),
          previousPosition: generateRandomExperience(),
          feedback: settings.INITIAL_FEEDBACK,
          status: GigApplicationStatus.pending,
        },
      );
      const populatedGigApplication = { ...response.data, gig };
      delete populatedGigApplication.gigId;
      setGigApplications(
        gigApplications.length
          ? [...gigApplications, populatedGigApplication]
          : [populatedGigApplication],
      );
    }
  }, [activeResumeId, getUserById, gigApplications, setGigApplications]);

  const uploadResume = useCallback(async(resume: Resume): Promise<Resume> => {
    const response = await axios.post(`${settings.BASE_SERVER_URL}/resumes`, resume);
    return response?.data;
  }, []);

  const uploadResumes = useCallback(async(newResumes: Resume[]) => {
    await Promise.all<Resume>(newResumes.map(newResume => uploadResume(newResume)));
    setResumes(resumes?.length ? [...resumes, ...newResumes] : newResumes);
  }, [resumes, uploadResume]);

  const updateActiveResume = useCallback((resumeId: string): void => {
    if (resumes?.find(resume => resume.id === resumeId)) {
      setActiveResumeId(resumeId);
      window.localStorage.setItem('activeResumeId', resumeId);
    }
  }, [resumes]);

  const getEmployerReviews = useCallback(async(employer: string): Promise<EmployerReview[]> => {
    const response = await axios.get(
      `${settings.BASE_SERVER_URL}/employerReviews?employer=${employer}`
    );
    return response.data;
  }, []);

  const updateActiveGig = useCallback(async(gig: Gig | undefined) => {
    if (!gig) {
      setActiveGig(undefined);
      return;
    }
    const gigCopy = { ...gig };
    gigCopy.employerReviews = await getEmployerReviews(gig.employer);
    setActiveGig(gigCopy);
  }, [getEmployerReviews]);

  const value = {
    activeGig,
    activeResumeId,
    favoriteGigs,
    gigApplications,
    resumes,
    applyToGig,
    getFavoriteGigs,
    getGigApplications,
    getResumes,
    toggleFavoriteGig,
    updateActiveGig,
    updateActiveResume,
    uploadResumes,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export default UserProvider;
