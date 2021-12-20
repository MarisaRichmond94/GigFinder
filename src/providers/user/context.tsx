import { createContext } from 'react';

import { EmployerReview, Gig, PopulatedApplication, Resume } from 'types';

interface UserContextType {
  activeGig?: Gig,
  activeResumeId?: string,
  applications: PopulatedApplication[],
  employerReviews?: EmployerReview[],
  favoriteGigs: Gig[],
  resumes?: Resume[],
  addReviewToEmployerReviews: (employerReview: EmployerReview) => void,
  applyToGig: (userId: string, gigId: string) => void,
  getApplications: (userId: string) => void,
  getFavoriteGigs: (userId: string) => void,
  getResumes: (userId: string) => void,
  submitReviewFeedback: (employerReview: EmployerReview, isPositive: boolean) => void,
  toggleFavoriteGig: (userId: string, gigId: string) => void,
  updateActiveGig: (matchingGig: Gig) => void,
  updateActiveResume: (resumeId: string) => void,
  uploadResumes: (resumes: Resume[]) => void,
}

const UserContext = createContext<undefined | UserContextType>(undefined);

export default UserContext;
