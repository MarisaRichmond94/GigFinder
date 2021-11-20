import { useState } from 'react';

import UserContext from 'providers/user/context';
import { FavoriteGig, User } from 'types';

const UserProvider = (props: object) => {
  const [favoriteGigs, setFavoriteGigs] = useState<FavoriteGig[] | undefined>();
  const [user, setUser] = useState<User | undefined>();

  const toggleFavoriteGig = (gigId: string): void => {
    console.log('toggle favorite gig')
  }

  const value = {
    favoriteGigs,
    user,
    toggleFavoriteGig,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export default UserProvider;
