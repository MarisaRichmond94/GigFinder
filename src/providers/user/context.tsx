import { createContext } from 'react';

import { Gig } from 'types';

interface UserContextType {
  favoriteGigs?: Gig[],
  getFavoriteGigs: (userId: string) => void,
  toggleFavoriteGig: (userId: string, gigId: string) => void,
}

const UserContext = createContext<undefined | UserContextType>(undefined);

export default UserContext;
