import { createContext } from 'react';

import { Employer, User } from 'types';

interface AuthContextType {
  employer?: Employer,
  isLoggedIn: boolean,
  isLoggingIn: boolean,
  user?: User,
  loginEmployer: (callback?: () => void) => void,
  loginUser: (callback?: () => void) => void,
  logout: () => void,
  signUpEmployer: (callback?: () => void) => void,
  signUpUser: (callback?: () => void) => void,
}

const AuthContext = createContext<undefined | AuthContextType>(undefined);

export default AuthContext;
