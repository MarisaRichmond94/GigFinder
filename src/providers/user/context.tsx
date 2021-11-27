import { createContext } from 'react';

import { Gig, GigApplication, GigWithReviews, UserResume } from 'types';

interface UserContextType {
  activeGig?: GigWithReviews,
  activeResumeId?: string,
  favoriteGigs: Gig[],
  gigApplications: GigApplication[],
  userResumes?: UserResume[],
  applyToGig: (userId: string, gigId: string) => void,
  getFavoriteGigs: (userId: string) => void,
  getGigApplications: (userId: string) => void,
  getUserResumes: (userId: string) => void,
  toggleFavoriteGig: (userId: string, gigId: string) => void,
  updateActiveGig: (matchingGig: Gig) => void,
  updateActiveResume: (userResumeId: string) => void,
  uploadUserResumes: (userResumes: UserResume[]) => void,
}

const UserContext = createContext<undefined | UserContextType>(undefined);

export default UserContext;
