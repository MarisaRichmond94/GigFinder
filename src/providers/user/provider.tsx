import axios from 'axios';
import { useCallback, useState } from 'react';

import UserContext from 'providers/user/context';
import { Gig } from 'types';
import generateUUID from 'utils/generateGUID';

const UserProvider = (props: object) => {
  const [favoriteGigs, setFavoriteGigs] = useState<Gig[] | undefined>();

  const getGigById = useCallback(async (gigId: string): Promise<Gig[]> => {
    const response = await axios.get(`http://localhost:8080/gigs?id=${gigId}`);
    if (response?.data?.length) {
      return response.data[0];
    }
    return [];
  }, [])

  const getFavoriteGigs = useCallback(async (userId: string) => {
    const response = await axios.get(`http://localhost:8080/userGigs?userId=${userId}`);
    const userGigs = await Promise.all<Gig>(
      response.data.map(userGig => getGigById(userGig.gigId))
    );
    setFavoriteGigs(userGigs);
  }, [getGigById]);

  const toggleFavoriteGig = useCallback(async (userId: string, gigId: string) => {
    const response = await axios.get(
      `http://localhost:8080/userGigs?userId=${userId}&gigId=${gigId}`
    );
    if (response?.data?.length) {
      await axios.delete(`http://localhost:8080/userGigs/${response.data[0].id}`);
      setFavoriteGigs(favoriteGigs?.filter(favoriteGig => favoriteGig.id !== gigId));
    } else {
      await axios.post('http://localhost:8080/userGigs', { id: generateUUID(), userId, gigId });
      const favoritedGig = await axios.get(`http://localhost:8080/gigs?id=${gigId}`);
      setFavoriteGigs([...favoriteGigs, favoritedGig.data[0]]);
    }
  }, [favoriteGigs, setFavoriteGigs]);

  const value = {
    favoriteGigs,
    getFavoriteGigs,
    toggleFavoriteGig,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export default UserProvider;
