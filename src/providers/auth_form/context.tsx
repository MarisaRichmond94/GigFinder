import { createContext } from 'react';

interface AuthFormContextType {
  authError?: string,
  email?: string,
  isSignUp: boolean,
  isUserAuth: boolean,
  name?: string,
  password?: string,
  getIsValidInput: (type: string) => boolean,
  resetForm: () => void,
  setAuthError: (authError?: string) => void,
  setIsApplicationSignUp: (isApplicationSignUp: boolean) => void,
  setIsSignUp: (isSignUp: boolean) => void,
  updateInput: (type: string, value: string) => void,
  validateInput: (type: string, value: string) => void,
}

const AuthFormContext = createContext<undefined | AuthFormContextType>(undefined);

export default AuthFormContext;
