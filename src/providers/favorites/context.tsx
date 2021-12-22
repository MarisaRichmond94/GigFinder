import { createContext } from 'react';

import { Gig } from 'types';

interface FavoritesContextType {
  favoriteGigs: Gig[],
  toggleFavoriteGig: (FavoritesId: string, gig: Gig) => void,
}

const FavoritesContext = createContext<undefined | FavoritesContextType>(undefined);

export default FavoritesContext;
