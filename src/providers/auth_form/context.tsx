import { createContext } from 'react';

interface AuthFormContextType {
  email?: string,
  isSignUp: boolean,
  isUserAuth: boolean,
  name?: string,
  password?: string,
  getIsValidInput: (type: string) => boolean,
  resetForm: () => void,
  setIsApplicationSignUp: (isApplicationSignUp: boolean) => void,
  setIsSignUp: (isSignUp: boolean) => void,
  updateInput: (type: string, value: string) => void,
  validateInput: (type: string, value: string) => void,
}

const AuthFormContext = createContext<undefined | AuthFormContextType>(undefined);

export default AuthFormContext;
