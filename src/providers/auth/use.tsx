import { useContext } from 'react';

import AuthContext from 'providers/auth/context';

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth should only be used within the AuthProvider.");
  }
  return context;
}

export default useAuth;
