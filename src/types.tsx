import { ReactElement } from 'react';

export enum AuthFieldType {
  name = 'name',
  email = 'email',
  password = 'password',
  all = 'all',
}

export enum CreatePanelTypes {
  gigs = 'gigs',
  candidates = 'candidates',
  post = 'post',
  templates = 'templates',
}

export interface Employer {
  id: string,
  name: string,
  email: string,
}

export interface EmployerReview {
  id: string,
  employer: string,
  rating: number,
  headline: string,
  title: string,
  isCurrentEmployee: boolean,
  city: string,
  state: string,
  abbrevState: string,
  datePosted: string,
  summary: string,
}

export enum FindPanelTypes {
  results = 'results',
  favorites = 'favorites',
  applications = 'applications',
}

export interface Gig {
  abbrevState: string,
  benefits: string[],
  city: string,
  createdAt: string,
  employer: string,
  employerReviews?: EmployerReview[],
  favoriteGigId?: string,
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

export enum GigApplicationStatus {
  pending = 'pending',
  accepted = 'accepted',
  rejected = 'rejected',
}

export enum GigFormFieldType {
  all = 'all',
  benefits = 'benefits',
  description = 'description',
  location = 'location',
  requirements = 'requirements',
  salary = 'salary',
  title = 'title',
  type = 'type',
}

export interface GigType {
  displayName: string,
}

export interface Option {
  displayName: string,
  icon?: ReactElement,
  id?: string,
  onClick?: () => void,
}

export interface PopulatedUserGigApplication {
  id: string,
  gig: Gig,
  userId: string,
  status: GigApplicationStatus,
}

export interface SearchParameters {
  title: string,
  location: string,
  type: string,
  filters: string,
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
  phone: string,
  address: string,
  degree: string,
  college: string,
}

export interface UserResume {
  id: string,
  name: string,
  userId: string,
}
