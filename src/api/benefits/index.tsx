import axios from 'axios';

import settings from 'settings';

const getBenefits = async (): Promise<string[]> => {
  const response = await axios.get(`${settings.BASE_SERVER_URL}/benefits`);
  if (response?.data) {
    return response.data;
  }
};

export {
  getBenefits,
};
