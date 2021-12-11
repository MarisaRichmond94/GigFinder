import axios from 'axios';

import settings from 'settings';
import { Resume } from 'types';

const createResume = async (resume: Resume): Promise<Resume[]> => {
  const response = await axios.post(`${settings.BASE_SERVER_URL}/resumes`, resume);
  if (response?.data) {
    return response.data;
  }
};

const getResumesByUserId = async (userId: string): Promise<Resume[]> => {
  const response = await axios.get(`${settings.BASE_SERVER_URL}/resumes?userId=${userId}`);
  if (response?.data) {
    return response.data;
  }
};

export {
  createResume,
  getResumesByUserId,
};
