import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

import UserContext from 'providers/user/context';
import settings from 'settings';
import { Gig, GigApplicationStatus, UserGigApplication, UserResume } from 'types';
import generateUUID from 'utils/generateGUID';

const UserProvider = (props: object) => {
  const [activeGig, setActiveGig] = useState<GigWithReviews | undefined>();
  const [activeResumeId, setActiveResumeId] = useState<string | undefined>(undefined);
  const [favoriteGigs, setFavoriteGigs] = useState<Gig[]>([]);
  const [gigApplications, setGigApplications] = useState<UserGigApplication[]>([]);
  const [userResumes, setUserResumes] = useState<UserResume[] | undefined>();

  useEffect(() => {
    const localActiveResumeId = window.localStorage.getItem('activeResumeId');
    if (localActiveResumeId) setActiveResumeId(localActiveResumeId);
    // eslint-disable-next-line
  }, []);

  const getGigById = useCallback(async (gigId: string): Promise<Gig[]> => {
    const response = await axios.get(`${settings.BASE_SERVER_URL}/gigs?id=${gigId}`);
    if (response?.data?.length) {
      return response.data[0];
    }
    return [];
  }, [])

  const getFavoriteGigs = useCallback(async (userId: string): void => {
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
  }, [getGigById]);

  const getUserResumes = useCallback(async (userId: string): void => {
    const response = await axios.get(`${settings.BASE_SERVER_URL}/userResumes?userId=${userId}`);
    setUserResumes(response.data);
  }, []);

  const getGigApplications = useCallback(async (userId: string): void => {
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
  }, [getGigById]);

  const toggleFavoriteGig = useCallback(async (userId: string, gigId: string): void => {
    const response = await axios.get(
      `${settings.BASE_SERVER_URL}/userGigs?userId=${userId}&gigId=${gigId}`
    );
    if (response?.data?.length) {
      await axios.delete(`${settings.BASE_SERVER_URL}/userGigs/${response.data[0].id}`);
      setFavoriteGigs(favoriteGigs?.filter(favoriteGig => favoriteGig.id !== gigId));
    } else {
      await axios.post(`${settings.BASE_SERVER_URL}/userGigs`, { id: generateUUID(), userId, gigId });
      const favoritedGig = await axios.get(`${settings.BASE_SERVER_URL}/gigs?id=${gigId}`);
      setFavoriteGigs([...favoriteGigs, favoritedGig.data[0]]);
    }
  }, [favoriteGigs, setFavoriteGigs]);

  const applyToGig = useCallback(async (userId: string, gigId: string): void => {
    if (activeResumeId) {
      const response = await axios.post(
        `${settings.BASE_SERVER_URL}/userGigApplications`,
        {
          id: generateUUID(),
          userId,
          gigId,
          status: GigApplicationStatus.pending,
        },
      );
      const gig = await getGigById(response.data.gigId);
      const populatedGigApplication = { ...response.data, gig };
      delete populatedGigApplication.gigId;
      setGigApplications(
        gigApplications.length
          ? [...gigApplications, populatedGigApplication]
          : [populatedGigApplication],
      );
    }
  }, [activeResumeId, favoriteGigs, gigApplications, setGigApplications]);

  const uploadUserResume = useCallback(async(userResume: UserResume): Promise<UserResume> => {
    const response = await axios.post(`${settings.BASE_SERVER_URL}/userResumes`, userResume);
    return response?.data;
  }, []);

  const uploadUserResumes = useCallback(async(userResumes: UserResume[]): void => {
    const newUserResumes = await Promise.all<UserResume>(
      userResumes.map(userResume => uploadUserResume(userResume))
    );
    setUserResumes(userResumes?.length ? [...userResumes, ...newUserResumes] : newUserResumes);
  }, [uploadUserResume]);

  const updateActiveResume = useCallback((userResumeId: string): void => {
    if (userResumes?.find(userResume => userResume.id === userResumeId)) {
      setActiveResumeId(userResumeId);
      window.localStorage.setItem('activeResumeId', userResumeId);
    }
  }, [userResumes]);

  const getCompanyReviews = useCallback(async(company: string): CompanyReview[] => {
    const response = await axios.get(
      `${settings.BASE_SERVER_URL}/companyReviews?company=${company}`
    );
    return response.data;
  }, []);

  const updateActiveGig = useCallback(async(gig: Gig | undefined): void => {
    if (!gig) {
      setActiveGig(undefined);
      return;
    }
    const gigCopy = { ...gig };
    gigCopy.company_reviews = await getCompanyReviews(gig.company);
    setActiveGig(gigCopy);
  }, []);

  const value = {
    activeGig,
    activeResumeId,
    favoriteGigs,
    gigApplications,
    userResumes,
    applyToGig,
    getFavoriteGigs,
    getGigApplications,
    getUserResumes,
    toggleFavoriteGig,
    updateActiveGig,
    updateActiveResume,
    uploadUserResumes,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export default UserProvider;
