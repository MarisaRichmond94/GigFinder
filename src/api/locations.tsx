import axios from 'axios';

import settings from 'settings';

const getLocations = async (): Promise<string[]> => {
  const response = await axios.get(`${settings.BASE_SERVER_URL}/locations`);
  if (response?.data) {
    return response.data;
  }
};

export {
  getLocations,
};
