import { ReactElement } from 'react';

export enum AuthFieldType {
  name = 'name',
  email = 'email',
  password = 'password',
  all = 'all',
}

export interface CompanyReview {
  id: string,
  company: string,
  rating: number,
  headline: string,
  title: string,
  is_current_employee: boolean,
  city: string,
  state: string,
  abbrev_state: string,
  date_posted: string,
  summary: string,
}

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

export interface GigWithReviews {
  abbrev_state: string,
  benefits: string,
  city: string,
  company: string,
  company_reviews: CompanyReview[],
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
