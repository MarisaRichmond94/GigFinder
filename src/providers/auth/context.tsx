import { createContext } from 'react';

import { Employer, User } from 'types';

interface AuthContextType {
  employer?: Employer,
  isLoggedIn: boolean,
  user?: User,
  loginEmployer: (email: string) => void,
  loginUser: (email: string) => void,
  logout: () => void,
  signUpEmployer: (name: string, email: string) => void,
  signUpUser: (name: string, email: string) => void,
}

const AuthContext = createContext<undefined | AuthContextType>(undefined);

export default AuthContext;
