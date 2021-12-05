import axios from 'axios';

import settings from 'settings';
import { GigType } from 'types';

const getGigTypes = async (): Promise<GigType[]> => {
  const response = await axios.get(`${settings.BASE_SERVER_URL}/gigTypes`);
  if (response?.data) {
    return response.data;
  }
};

export {
  getGigTypes,
};
