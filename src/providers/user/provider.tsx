import axios from 'axios';
import { useCallback, useState } from 'react';

import UserContext from 'providers/user/context';
import { SearchResult } from 'types';
import generateUUID from 'utils/generateGUID';

const UserProvider = (props: object) => {
  const [favoriteGigs, setFavoriteGigs] = useState<string[] | undefined>();

  const getGigById = useCallback(async (gigId: string): Promise<SearchResult[]> => {
    const response = await axios.get(`http://localhost:8080/gigs?id=${gigId}`);
    if (response?.data?.length) {
      return response.data[0];
    }
    return [];
  }, [])

  const getFavoriteGigs = useCallback(async (userId: string) => {
    const response = await axios.get(`http://localhost:8080/userGigs?userId=${userId}`);
    const userGigs = await Promise.all<SearchResult>(
      response.data.map(userGig => getGigById(userGig.gigId))
    );
    setFavoriteGigs(userGigs.map(gig => gig.id));
  }, [getGigById]);

  const toggleFavoriteGig = useCallback(async (userId: string, gigId: string) => {
    const response = await axios.get(
      `http://localhost:8080/userGigs?userId=${userId}&gigId=${gigId}`
    );
    if (response?.data?.length) {
      await axios.delete(`http://localhost:8080/userGigs/${response.data[0].id}`);
      setFavoriteGigs(favoriteGigs?.filter(favoriteGig => favoriteGig !== gigId));
    } else {
      const favoritedGig = await axios.post(
        'http://localhost:8080/userGigs',
        { id: generateUUID(), userId, gigId },
      );
      if (favoritedGig?.data) {
        setFavoriteGigs([...favoriteGigs, favoritedGig.data.gigId]);
      }
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
