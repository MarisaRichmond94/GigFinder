import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from 'providers/auth/context';

const AuthProvider = (props: object) => {
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

  const value = {
    companyName,
    isLoggedIn,
    userName,
    createCompanyAccount,
    createUserAccount,
    loginCompany,
    loginUser,
    logout,
  };

  return <AuthContext.Provider value={value} {...props} />;
};

export default AuthProvider;
