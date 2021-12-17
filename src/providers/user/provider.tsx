import { loremIpsum } from 'lorem-ipsum';
import { useCallback, useEffect, useState } from 'react';

import ApplicationsApi from 'api/applications';
import EmployerReviewsApi from 'api/employer_reviews';
import GigsApi from 'api/gigs';
import ResumesApi from 'api/resumes';
import UserGigsApi from 'api/user_gigs';
import UsersApi from 'api/users';
import employers from 'mock/employers.json';
import titles from 'mock/titles.json';
import UserContext from 'providers/user/context';
import settings from 'settings';
import {
  EmployerReview, Gig, ApplicationStatus, PopulatedApplication, Resume, User,
} from 'types';
import generateGUID from 'utils/generateGUID';
import getRandomValueFromList from 'utils/getRandomValueFromList';
import replaceExistingItemInList from 'utils/replaceExistingItemInList';

const UserProvider = (props: object) => {
  const [activeGig, setActiveGig] = useState<Gig | undefined>();
  const [activeResumeId, setActiveResumeId] = useState<string | undefined>(undefined);
  const [employerReviews, setEmployerReviews] = useState<EmployerReview[] | undefined>();
  const [favoriteGigs, setFavoriteGigs] = useState<Gig[]>([]);
  const [applications, setApplications] = useState<PopulatedApplication[]>([]);
  const [resumes, setResumes] = useState<Resume[] | undefined>();

  useEffect(() => {
    const localActiveResumeId = window.localStorage.getItem('activeResumeId');
    if (localActiveResumeId) setActiveResumeId(localActiveResumeId);
    // eslint-disable-next-line
  }, []);

  const getUserById = useCallback(async (userId: string): Promise<User | undefined> => {
    const userById = await UsersApi.getById(userId);
    if (userById?.length) {
      return userById[0];
    }
    return undefined;
  }, [])

  const getFavoriteGigs = useCallback(async (userId: string) => {
    const allUserGigs = await UserGigsApi.get({ userId });
    let userGigs = await Promise.all<Gig>(
      allUserGigs.map(userGig => GigsApi.getById(userGig.gigId))
    );
    userGigs = userGigs.map(userGig => {
      userGig.favoriteGigId = allUserGigs.find(
        favoriteGig => favoriteGig.gigId === userGig.id,
      ).id;
      return userGig;
    });
    setFavoriteGigs(userGigs);
  }, []);

  const getResumes = useCallback(async (userId: string) => {
    const resumesByUserId = await ResumesApi.get({ userId });
    setResumes(resumesByUserId);
  }, []);

  const getApplications = useCallback(async (userId: string) => {
    const allUserApplications = await ApplicationsApi.get({ userId });
    const gigs = await Promise.all<Gig>(
      allUserApplications.map(userGigApplication => GigsApi.getById(userGigApplication.gigId))
    );
    const userApplications = allUserApplications.map(userGigApplication => {
      userGigApplication.gig = gigs.find(gig => gig.id === userGigApplication.gigId);
      delete userGigApplication.gigId;
      return userGigApplication;
    })
    setApplications(userApplications);
  }, []);

  const toggleFavoriteGig = useCallback(async (userId: string, gigId: string) => {
    const userGigsResponse = await UserGigsApi.get({ userId, gigId });
    if (userGigsResponse.length) {
      await UserGigsApi.deleteById(userGigsResponse[0].id);
      setFavoriteGigs(favoriteGigs?.filter(favoriteGig => favoriteGig.id !== gigId));
    } else {
      await UserGigsApi.post({ id: generateGUID(), userId, gigId });
      const favoritedGig = await GigsApi.getById(gigId);
      setFavoriteGigs([...favoriteGigs, favoritedGig]);
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

  const generateRandomBackground = () => {
    return {
      passedBackgroundCheck: Math.random() < 0.5 ? true : false,
      hasReleventCredentials: Math.random() < 0.5 ? true : false,
      meetsMinimumRequirements: Math.random() < 0.5 ? true : false,
    }
  }

  const applyToGig = useCallback(async (userId: string, gigId: string) => {
    if (activeResumeId) {
      const gig = await GigsApi.getById(gigId);
      const user = await getUserById(userId);
      const newApplication = {
        id: generateGUID(),
        employer: gig.employer,
        gigId,
        userId,
        candidate: user,
        currentPosition: generateRandomExperience(),
        previousPosition: generateRandomExperience(),
        feedback: settings.INITIAL_FEEDBACK,
        background: generateRandomBackground(),
        status: ApplicationStatus.pending,
      }
      const newApplicationResponse = await ApplicationsApi.post(newApplication);
      const populatedGigApplication = { ...newApplicationResponse, gig };
      delete populatedGigApplication.gigId;
      setApplications(
        applications.length
          ? [...applications, populatedGigApplication]
          : [populatedGigApplication],
      );
    }
  }, [activeResumeId, applications, getUserById, setApplications]);

  const uploadResume = useCallback(async(resume: Resume): Promise<Resume> => {
    const response = await ResumesApi.post(resume);
    return response;
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

  const updateActiveGig = useCallback(async (gig: Gig) => {
    if (gig) {
      setActiveGig(gig);
      const activeGigEmployerReviews = await EmployerReviewsApi.get({ employer: gig.employer });
      setEmployerReviews(activeGigEmployerReviews);
    }
  }, []);

  const submitReviewFeedback = useCallback(
    async (employerReview: EmployerReview, isPositive: boolean) => {
      isPositive
        ? employerReview.positiveFeedbackCounter += 1
        : employerReview.negativeFeedbackCounter += 1;
      const updatedEmployerReview = await EmployerReviewsApi.update(
        employerReview.id,
        employerReview,
      );
      if (updatedEmployerReview) {
        replaceExistingItemInList(updatedEmployerReview, employerReviews, setEmployerReviews);
      }
    },
    [employerReviews],
  );

  const value = {
    activeGig,
    activeResumeId,
    applications,
    employerReviews,
    favoriteGigs,
    resumes,
    applyToGig,
    getApplications,
    getFavoriteGigs,
    getResumes,
    submitReviewFeedback,
    toggleFavoriteGig,
    updateActiveGig,
    updateActiveResume,
    uploadResumes,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export default UserProvider;
