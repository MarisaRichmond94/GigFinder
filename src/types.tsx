import { ReactElement } from 'react';

export interface Employer {
  id: string,
  name: string,
  email: string,
}

export interface Gig {
  abbrev_state: string,
  benefits: string,
  city: string,
  company: string,
  created_at: string,
  description: string,
  id: string,
  rating: number,
  requirements: string,
  salary: string,
  state: string,
  title: string,
  type: string,
  views: number,
}

export interface Option {
  displayName: string,
  icon?: ReactElement,
  id?: string,
  onClick?: () => void,
}

export interface SearchParameters {
  title: string,
  location: string,
  type: string,
}

export interface UploadFile {
  id: string,
  name: string,
  status?: string,
}

export interface User {
  id: string,
  name: string,
  email: string,
}

export interface UserResume {
  id: string,
  name: string,
  userId: string,
}
