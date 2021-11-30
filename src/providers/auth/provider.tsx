import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import colleges from 'mock/colleges.json';
import degrees from 'mock/degrees.json';
import AuthContext from 'providers/auth/context';
import settings from 'settings';
import { Employer, User } from 'types';
import generateUUID from 'utils/generateGUID';
import getRandomValueFromList from 'utils/getRandomValueFromList';

const AuthProvider = (props: object) => {
  const history = useHistory();
  const { pathname } = useLocation();
  const [user, setUser] = useState<User | undefined>();
  const [employer, setEmployer] = useState<Employer | undefined>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userId = window.localStorage.getItem('userId');
    if (userId) {
      axios.get(`${settings.BASE_SERVER_URL}/users/${userId}`).then(response => {
        if (response?.data) {
          setUser(response.data);
          setIsLoggedIn(true);
        }
      });
    }
  }, []);

  useEffect(() => {
    const employerId = window.localStorage.getItem('employerId');
    if (employerId) {
      axios.get(`${settings.BASE_SERVER_URL}/employers/${employerId}`).then(response => {
        if (response?.data) {
          setEmployer(response.data);
          setIsLoggedIn(true);
        }
      });
    }
  }, []);

  useEffect(() => {
    const employerId = window.localStorage.getItem('employerId');
    if (employerId) {
      axios.get(`${settings.BASE_SERVER_URL}/employers/${employerId}`).then(response => {
        if (response?.data) {
          setEmployer(response.data);
          setIsLoggedIn(true);
        }
      });
    }
  }, []);

  const signUpEmployer = (name: string, email: string): void => {
    axios.post(
      `${settings.BASE_SERVER_URL}/employers`,
      { id: generateUUID(), name, email },
    ).then(response => {
      if (response?.data?.length) {
        setEmployer(response.data?.[0]);
        setIsLoggedIn(true);
        window.localStorage.setItem("employerId", response.data?.[0].id);

        if (pathname === settings.FIND_ROUTE) {
          history.replace(settings.CREATE_ROUTE);
        }
      }
    });
  }

  const signUpUser = (name: string, email: string): void => {
    axios.post(
      `${settings.BASE_SERVER_URL}/users`,
      {
        id: generateUUID(),
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
      },
    ).then(response => {
      if (response?.data?.length) {
        setUser(response.data?.[0]);
        setIsLoggedIn(true);
        window.localStorage.setItem("userId", response.data?.[0].id);
      }
    });
  }

  const loginEmployer = (email: string): void => {
    axios.get(`${settings.BASE_SERVER_URL}/employers?email=${email}`)
      .then(response => {
        if (response?.data?.length) {
          setEmployer(response.data?.[0]);
          setIsLoggedIn(true);
          window.localStorage.setItem("employerId", response.data?.[0].id);

          if (pathname === settings.FIND_ROUTE) {
            history.replace(settings.CREATE_ROUTE);
          }
        }
      });
  }

  const loginUser = (email: string): void => {
    axios.get(`${settings.BASE_SERVER_URL}/users?email=${email}`)
      .then(response => {
        if (response?.data?.length) {
          setUser(response.data?.[0]);
          setIsLoggedIn(true);
          window.localStorage.setItem("userId", response.data?.[0].id);
        }
      });
  }

  const logout = (): void => {
    setEmployer(undefined);
    setUser(undefined);
    setIsLoggedIn(false);
    history.replace('/');
    window.localStorage.clear();
  }

  const value = {
    employer,
    isLoggedIn,
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
