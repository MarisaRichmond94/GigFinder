import { useCallback, useEffect, useState } from 'react';

import UserGigsApi from 'api/user_gigs';
import GigsApi from 'api/gigs';
import { usePrevious } from 'hooks/usePrevious';
import FavoritesContext from 'providers/favorites/context';
import { useAuth } from 'providers/auth';
import { Gig } from 'types';
import generateGUID from 'utils/generateGUID';

const FavoritesProvider = (props: object) => {
  // provider variables
  const { user } = useAuth();
  const userId = user?.id;
  const prevUserId = usePrevious(userId);
  // local state variables and functions
  const [favoriteGigs, setFavoriteGigs] = useState<Gig[]>([]);

  const getFavoriteGigs = useCallback(async (userId: string) => {
    const allUserGigs = await UserGigsApi.get({ userId });
    let userGigs = await Promise.all<Gig>(
      allUserGigs.map(userGig => GigsApi.getById(userGig.gigId))
    );
    userGigs = userGigs.map(userGig => {
      userGig.favoriteGigId = allUserGigs.find(
        favoriteGig => favoriteGig.gigId === userGig.id,
      ).id;
      return userGig;
    });
    setFavoriteGigs(userGigs);
  }, []);

  useEffect(() => {
    if (userId && userId !== prevUserId) getFavoriteGigs(userId);
  }, [userId, prevUserId, getFavoriteGigs]);

  const toggleFavoriteGig = useCallback(async (userId: string, gig: Gig) => {
    if (favoriteGigs?.find(x => x.id === gig.id)) {
      setFavoriteGigs(favoriteGigs?.filter(x => x.id !== gig.id));
      const userGigsResponse = await UserGigsApi.get({ userId, gigId: gig.id });
      userGigsResponse.forEach(x => UserGigsApi.deleteById(x.id));
    } else {
      setFavoriteGigs([...favoriteGigs, gig]);
      UserGigsApi.post({ id: generateGUID(), userId, gigId: gig.id });
    }
  }, [favoriteGigs, setFavoriteGigs]);

  const value = {
    favoriteGigs,
    toggleFavoriteGig,
  };

  return <FavoritesContext.Provider value={value} {...props} />;
};

export default FavoritesProvider;
