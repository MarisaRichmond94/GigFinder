import { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import EmployersApi from 'api/employers';
import UsersApi from 'api/users';
import colleges from 'mock/colleges.json';
import degrees from 'mock/degrees.json';
import AuthContext from 'providers/auth/context';
import { useAuthForm } from 'providers/auth_form';
import settings from 'settings';
import { Employer, User } from 'types';
import generateGUID from 'utils/generateGUID';
import getRandomValueFromList from 'utils/getRandomValueFromList';

const AuthProvider = (props: object) => {
  const { name, email, setAuthError } = useAuthForm();
  const history = useHistory();
  const { pathname } = useLocation();
  const [user, setUser] = useState<User | undefined>();
  const [employer, setEmployer] = useState<Employer | undefined>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(true);

  useEffect(() => {
    async function getUserById(userId: string) {
      const userResponse = await UsersApi.getById(userId);
      setUser(userResponse);
      setIsLoggedIn(true);
      setIsLoggingIn(false);
    }

    async function getEmployerById(employerId: string) {
      const employerResponse = await EmployersApi.getById(employerId);
      setEmployer(employerResponse);
      setIsLoggedIn(true);
      setIsLoggingIn(false);
    }

    setTimeout(() => {
      const userId = window.localStorage.getItem('userId');
      const employerId = window.localStorage.getItem('employerId');
      if (userId) getUserById(userId);
      else if (employerId) getEmployerById(employerId)
      else setIsLoggingIn(false);
    }, 1000);
  }, []);

  const signUpEmployer = useCallback(async (callback?: () => void) => {
    const signedUpEmployer = await EmployersApi.post({ id: generateGUID(), name, email });
    if (signedUpEmployer) {
      setEmployer(signedUpEmployer);
      setIsLoggedIn(true);
      window.localStorage.setItem('employerId', signedUpEmployer.id);
      if (pathname === settings.FIND_ROUTE) {
        history.replace(settings.CREATE_ROUTE);
      }
      callback();
    } else {
      setAuthError('Failed to sign up new employer; Please try again');
    }
  }, [email, name, history, pathname, setAuthError]);

  const signUpUser = useCallback(async (callback?: () => void) => {
    const newUser = {
      id: generateGUID(),
      name,
      email,
      phone: (
        `(${Math.floor(100 + Math.random() * 9000)}) -
          ${Math.floor(100 + Math.random() * 9000)} -
          ${Math.floor(1000 + Math.random() * 9000)}`
      ),
      address: `${Math.floor(10000 + Math.random() * 9000)} Fake St., Malibu, CA, 90210`,
      degree: getRandomValueFromList(degrees),
      college: getRandomValueFromList(colleges),
    };

    const signedUpUser = await UsersApi.post(newUser);
    if (signedUpUser) {
      setUser(signedUpUser);
      setIsLoggedIn(true);
      window.localStorage.setItem('userId', signedUpUser.id);
      if (pathname === settings.CREATE_ROUTE) {
        history.replace(settings.FIND_ROUTE);
      }
      callback();
    } else {
      setAuthError('Failed to sign up new user; Please try again');
    }
  }, [email, name, history, pathname, setAuthError]);

  const loginEmployer = useCallback(async (callback?: () => void) => {
    const loggedInEmployer = await EmployersApi.get({ email });
    if (loggedInEmployer.length) {
      setEmployer(loggedInEmployer[0]);
      setIsLoggedIn(true);
      window.localStorage.setItem('employerId', loggedInEmployer[0].id);
      if (pathname === settings.FIND_ROUTE) {
        history.replace(settings.CREATE_ROUTE);
      }
      callback();
    } else {
      setAuthError('Login failed. Incorrect email or password.');
    }
  }, [email, history, pathname, setAuthError]);

  const loginUser = useCallback(async (callback?: () => void) => {
    const loggedInUser = await UsersApi.get({ email });
    if (loggedInUser?.length) {
      setUser(loggedInUser[0]);
      setIsLoggedIn(true);
      window.localStorage.setItem('userId', loggedInUser[0].id);
      if (pathname === settings.CREATE_ROUTE) {
        history.replace(settings.FIND_ROUTE);
      }
      callback();
    } else {
      setAuthError('Login failed. Incorrect email or password.');
    }
  }, [email, history, pathname, setAuthError]);

  const logout = useCallback((): void => {
    setEmployer(undefined);
    setUser(undefined);
    setIsLoggedIn(false);
    history.replace('/');
    window.localStorage.clear();
  }, [history]);

  const value = {
    employer,
    isLoggedIn,
    isLoggingIn,
    user,
    loginEmployer,
    loginUser,
    logout,
    signUpEmployer,
    signUpUser,
  };

  return <AuthContext.Provider value={value} {...props} />;
};

export default AuthProvider;
