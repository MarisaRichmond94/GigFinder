import axios from 'axios';

import settings from 'settings';

const getTitles = async (): Promise<string[]> => {
  const response = await axios.get(`${settings.BASE_SERVER_URL}/titles`);
  if (response?.data) {
    return response.data;
  }
};

export {
  getTitles,
};
