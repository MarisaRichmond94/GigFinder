import { useCallback, useEffect, useState } from 'react';

import ApplicationsApi from 'api/applications';
import EmployerReviewsApi from 'api/employer_reviews';
import GigsApi from 'api/gigs';
import ResumesApi from 'api/resumes';
import { usePrevious } from 'hooks/usePrevious';
import { generateRandomBackground, generateRandomExperience } from 'libs/gigs';
import { useAuth } from 'providers/auth';
import UserContext from 'providers/user/context';
import settings from 'settings';
import { EmployerReview, Gig, ApplicationStatus, PopulatedApplication, Resume } from 'types';
import generateGUID from 'utils/generateGUID';
import replaceExistingItemInList from 'utils/replaceExistingItemInList';

const UserProvider = (props: object) => {
  // provider variables
  const { user } = useAuth();
  const userId = user?.id;
  const prevUserId = usePrevious(userId);

  // local state variables and functions
  const [activeGig, setActiveGig] = useState<Gig | undefined>();
  const [activeResumeId, setActiveResumeId] = useState<string | undefined>(undefined);
  const [employerReviews, setEmployerReviews] = useState<EmployerReview[] | undefined>();
  const [applications, setApplications] = useState<PopulatedApplication[]>([]);
  const [resumes, setResumes] = useState<Resume[] | undefined>();

  useEffect(() => {
    const localActiveResumeId = window.localStorage.getItem('activeResumeId');
    if (localActiveResumeId) setActiveResumeId(localActiveResumeId);
    // eslint-disable-next-line
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

  useEffect(() => {
    if (userId && userId !== prevUserId) {
      getApplications(userId);
      getResumes(userId);
    }
  }, [userId, prevUserId, getApplications, getResumes]);

  const applyToGig = useCallback(async (gig: Gig) => {
    if (activeResumeId) {
      const newApplication = {
        id: generateGUID(),
        employer: gig.employer,
        gigId: gig.id,
        userId: user.id,
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
  }, [activeResumeId, applications, user, setApplications]);

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

  const addReviewToEmployerReviews = useCallback((employerReview: EmployerReview): void => {
    if (employerReview) {
      setEmployerReviews(
        employerReviews.length ? [...employerReviews, employerReview] : [employerReview],
      );
    }
  }, [employerReviews]);

  const value = {
    activeGig,
    activeResumeId,
    applications,
    employerReviews,
    resumes,
    addReviewToEmployerReviews,
    applyToGig,
    submitReviewFeedback,
    updateActiveGig,
    updateActiveResume,
    uploadResumes,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export default UserProvider;
