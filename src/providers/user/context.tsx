import { createContext } from 'react';

import { FavoriteGig, User } from 'types';

interface UserContextType {
  favoriteGigs?: FavoriteGig[],
  user?: User,
  toggleFavoriteGig: (gigId: string) => void,
}

const UserContext = createContext<undefined | UserContextType>(undefined);

export default UserContext;
