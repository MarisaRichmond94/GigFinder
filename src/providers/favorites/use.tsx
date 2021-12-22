import { useContext } from 'react';

import FavoritesContext from 'providers/favorites/context';

const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites should only be used within the FavoritesProvider.');
  }
  return context;
}

export default useFavorites;
