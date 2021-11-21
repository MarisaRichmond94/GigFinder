import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

import UserContext from 'providers/user/context';
import { Gig, UserResume } from 'types';
import generateUUID from 'utils/generateGUID';

const UserProvider = (props: object) => {
  const [activeResumeId, setActiveResumeId] = useState<string | undefined>(undefined);
  const [favoriteGigs, setFavoriteGigs] = useState<Gig[] | undefined>();
  const [userResumes, setUserResumes] = useState<UserResume[] | undefined>();

  useEffect(() => {
    const localActiveResumeId = window.localStorage.getItem('activeResumeId');
    if (localActiveResumeId) setActiveResumeId(localActiveResumeId);
    // eslint-disable-next-line
  }, []);

  const getGigById = useCallback(async (gigId: string): Promise<Gig[]> => {
    const response = await axios.get(`http://localhost:8080/gigs?id=${gigId}`);
    if (response?.data?.length) {
      return response.data[0];
    }
    return [];
  }, [])

  const getFavoriteGigs = useCallback(async (userId: string) => {
    const response = await axios.get(`http://localhost:8080/userGigs?userId=${userId}`);
    const userGigs = await Promise.all<Gig>(
      response.data.map(userGig => getGigById(userGig.gigId))
    );
    setFavoriteGigs(userGigs);
  }, [getGigById]);

  const getUserResumes = useCallback(async (userId: string) => {
    const response = await axios.get(`http://localhost:8080/userResumes?userId=${userId}`);
    setUserResumes(response.data);
  }, []);

  const toggleFavoriteGig = useCallback(async (userId: string, gigId: string) => {
    const response = await axios.get(
      `http://localhost:8080/userGigs?userId=${userId}&gigId=${gigId}`
    );
    if (response?.data?.length) {
      await axios.delete(`http://localhost:8080/userGigs/${response.data[0].id}`);
      setFavoriteGigs(favoriteGigs?.filter(favoriteGig => favoriteGig.id !== gigId));
    } else {
      await axios.post('http://localhost:8080/userGigs', { id: generateUUID(), userId, gigId });
      const favoritedGig = await axios.get(`http://localhost:8080/gigs?id=${gigId}`);
      setFavoriteGigs([...favoriteGigs, favoritedGig.data[0]]);
    }
  }, [favoriteGigs, setFavoriteGigs]);

  const uploadUserResume = useCallback(async(userResume: UserResume): Promise<UserResume> => {
    const response = await axios.post('http://localhost:8080/userResumes', userResume);
    return response?.data;
  }, []);

  const uploadUserResumes = useCallback(async(userResumes: UserResume[]) => {
    const newUserResumes = await Promise.all<UserResume>(
      userResumes.map(userResume => uploadUserResume(userResume))
    );
    setUserResumes(userResumes?.length ? [...userResumes, ...newUserResumes] : newUserResumes);
  }, [uploadUserResume]);

  const updateActiveResume = useCallback((userResumeId: string): void => {
    if (userResumes?.find(userResume => userResume.id === userResumeId)) {
      setActiveResumeId(userResumeId);
      window.localStorage.setItem('activeResumeId', userResumeId);
    }
  }, [userResumes]);

  const value = {
    activeResumeId,
    favoriteGigs,
    userResumes,
    getFavoriteGigs,
    getUserResumes,
    toggleFavoriteGig,
    updateActiveResume,
    uploadUserResumes,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export default UserProvider;
