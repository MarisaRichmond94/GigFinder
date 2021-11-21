import { createContext } from 'react';

interface UserContextType {
  favoriteGigs?: string[],
  getFavoriteGigs: (userId: string) => void,
  toggleFavoriteGig: (userId: string, gigId: string) => void,
}

const UserContext = createContext<undefined | UserContextType>(undefined);

export default UserContext;
