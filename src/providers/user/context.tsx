import { createContext } from 'react';

import { Gig, PopulatedUserGigApplication, UserResume } from 'types';

interface UserContextType {
  activeGig?: Gig,
  activeResumeId?: string,
  favoriteGigs: Gig[],
  gigApplications: PopulatedUserGigApplication[],
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
