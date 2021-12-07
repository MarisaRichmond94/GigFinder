import axios from 'axios';

import settings from 'settings';
import { GigType } from 'types';

const getTypes = async (): Promise<GigType[]> => {
  const response = await axios.get(`${settings.BASE_SERVER_URL}/types`);
  if (response?.data) {
    return response.data;
  }
};

export {
  getTypes,
};
