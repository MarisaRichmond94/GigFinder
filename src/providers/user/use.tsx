import { useContext } from 'react';

import UserContext from 'providers/user/context';

const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser should only be used within the UserProvider.");
  }
  return context;
}

export default useUser;
