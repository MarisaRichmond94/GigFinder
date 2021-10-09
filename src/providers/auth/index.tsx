import { createContext, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContextType } from './types';

const AuthContext = createContext<undefined | AuthContextType>(undefined);

const AuthProvider = (props: object) => {
  return <AuthContext.Provider value={UseProvideAuth()} {...props} />;
};

function UseProvideAuth(): AuthContextType {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [companyName, setCompanyName] = useState('Macrosoft');
  const [userName, setUserName] = useState('Drake Styker');

  const createCompanyAccount = (name: string): void => {
    setCompanyName(name);
    setIsLoggedIn(true);
  }

  const createUserAccount = (name: string): void => {
    setUserName(name);
    setIsLoggedIn(true);
  }

  const loginCompany = (): void => {
    setIsLoggedIn(true);
  }

  const loginUser = (): void => {
    setIsLoggedIn(true);
  }

  const logout = (): void => {
    setCompanyName(undefined);
    setUserName(undefined);
    setIsLoggedIn(false);
    history.replace('/');
  }

  return {
    companyName,
    isLoggedIn,
    userName,
    createCompanyAccount,
    createUserAccount,
    loginCompany,
    loginUser,
    logout,
  };
}

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth should only be used within the AuthProvider.");
  }
  return context;
}

export { AuthProvider, useAuth };
