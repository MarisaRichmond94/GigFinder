import { createContext } from 'react';

import { Gig, PopulatedUserGigApplication, Resume } from 'types';

interface UserContextType {
  activeGig?: Gig,
  activeResumeId?: string,
  favoriteGigs: Gig[],
  gigApplications: PopulatedUserGigApplication[],
  resumes?: Resume[],
  applyToGig: (userId: string, gigId: string) => void,
  getFavoriteGigs: (userId: string) => void,
  getGigApplications: (userId: string) => void,
  getResumes: (userId: string) => void,
  toggleFavoriteGig: (userId: string, gigId: string) => void,
  updateActiveGig: (matchingGig: Gig) => void,
  updateActiveResume: (resumeId: string) => void,
  uploadResumes: (resumes: Resume[]) => void,
}

const UserContext = createContext<undefined | UserContextType>(undefined);

export default UserContext;
