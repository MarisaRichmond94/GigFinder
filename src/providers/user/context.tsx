import { createContext } from 'react';

import { EmployerReview, Gig, PopulatedApplication, Resume } from 'types';

interface UserContextType {
  activeGig?: Gig,
  activeResumeId?: string,
  applications: PopulatedApplication[],
  employerReviews?: EmployerReview[],
  resumes?: Resume[],
  addReviewToEmployerReviews: (employerReview: EmployerReview) => void,
  applyToGig: (gig: Gig) => void,
  submitReviewFeedback: (employerReview: EmployerReview, isPositive: boolean) => void,
  updateActiveGig: (matchingGig: Gig) => void,
  updateActiveResume: (resumeId: string) => void,
  uploadResumes: (resumes: Resume[]) => void,
}

const UserContext = createContext<undefined | UserContextType>(undefined);

export default UserContext;
