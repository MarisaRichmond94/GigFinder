import axios from 'axios';

import settings from 'settings';
import { Gig } from 'types';
import { keysToSnake } from 'utils/convertCasing';

interface GigQueryParams {
  cityLike?: string,
  titleLike?: string,
  type: string,
}

const getGigById = async (gigId: string): Promise<Gig | undefined> => {
  const response = await axios.get(`${settings.BASE_SERVER_URL}/gigs?id=${gigId}`);
  if (response?.data?.length) {
    return response.data[0];
  }
};

const searchGigs = async(queryParams: GigQueryParams) => {
  const url = `${settings.BASE_SERVER_URL}/gigs?${buildQueryString(queryParams)}`;
  const response = await axios.get(url);
  if (response?.data) {
    return response.data;
  }
}

const getGigsByEmployer = async(employer: string) => {
  const response = await axios.get(`${settings.BASE_SERVER_URL}/gigs?employer=${employer}`);
  if (response?.data) {
    return response.data;
  }
}

const deleteGigById = async(gigId: string): Promise<Gig | undefined> => {
  const response = await axios.delete(`${settings.BASE_SERVER_URL}/gigs/${gigId}`);
  if (response?.data) {
    return response.data;
  }
}

const buildQueryString = query => {
  query = keysToSnake(query);
  const queryString = Object.keys(query).reduce((accumulation, key) => {
    return accumulation + `${key}=${encodeURIComponent(query[key])}&`;
  }, '');
  return (queryString.endsWith('&')) ? queryString.slice(0, -1) : queryString;
}

export {
  deleteGigById,
  getGigsByEmployer,
  getGigById,
  searchGigs,
};
