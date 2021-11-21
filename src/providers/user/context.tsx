import { createContext } from 'react';

import { Gig, UserResume } from 'types';

interface UserContextType {
  activeResumeId?: string,
  favoriteGigs?: Gig[],
  userResumes?: UserResume[],
  getFavoriteGigs: (userId: string) => void,
  getUserResumes: (userId: string) => void,
  toggleFavoriteGig: (userId: string, gigId: string) => void,
  updateActiveResume: (userResumeId: string) => void,
  uploadUserResumes: (userResumes: UserResume[]) => void,
}

const UserContext = createContext<undefined | UserContextType>(undefined);

export default UserContext;
