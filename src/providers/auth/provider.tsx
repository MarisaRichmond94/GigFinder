import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from 'providers/auth/context';
import { Employer, User } from 'types';
import generateUUID from 'utils/generateGUID';

const AuthProvider = (props: object) => {
  const history = useHistory();
  const [user, setUser] = useState<User | undefined>();
  const [employer, setEmployer] = useState<Employer | undefined>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userId = window.localStorage.getItem('userId');
    if (userId) {
      axios.get(`http://localhost:8080/users/${userId}`).then(response => {
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
      axios.get(`http://localhost:8080/employers/${employerId}`).then(response => {
        if (response?.data) {
          setEmployer(response.data);
          setIsLoggedIn(true);
        }
      });
    }
  }, []);

  const signUpEmployer = (name: string, email: string): void => {
    axios.post(
      'http://localhost:8080/employers',
      { id: generateUUID(), name, email },
    ).then(response => {
      if (response?.data?.length) {
        setEmployer(response.data?.[0]);
        setIsLoggedIn(true);
        window.localStorage.setItem("employerId", response.data?.[0].id);
      }
    });
  }

  const signUpUser = (name: string, email: string): void => {
    axios.post(
      'http://localhost:8080/users',
      { id: generateUUID(), name, email },
    ).then(response => {
      if (response?.data?.length) {
        setUser(response.data?.[0]);
        setIsLoggedIn(true);
        window.localStorage.setItem("userId", response.data?.[0].id);
      }
    });
  }

  const loginEmployer = (email: string): void => {
    axios.get(`http://localhost:8080/employers?email=${email}`)
      .then(response => {
        if (response?.data?.length) {
          setEmployer(response.data?.[0]);
          setIsLoggedIn(true);
          window.localStorage.setItem("employerId", response.data?.[0].id);
        }
      });
  }

  const loginUser = (email: string): void => {
    axios.get(`http://localhost:8080/users?email=${email}`)
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
