import { ReactElement } from 'react';

export interface Application {
  id: string,
  employer: string,
  gigId: string,
  userId: string,
  candidate: Candidate,
  currentPosition: Position,
  previousPosition: Position,
  feedback: Feedback,
  background: Background,
  status: ApplicationStatus,
}

export enum ApplicationStatus {
  pending = 'pending',
  accepted = 'accepted',
  rejected = 'rejected',
}

export enum AuthFieldType {
  name = 'name',
  email = 'email',
  password = 'password',
  all = 'all',
}

export interface Background {
  passedBackgroundCheck: boolean,
  hasReleventCredentials: boolean,
  meetsMinimumRequirements: boolean,
}

export interface Candidate {
  id: string,
  name: string,
  email: string,
  phone: string,
  address: string,
  degree: string,
  college: string,
}

export enum CreatePanelTypes {
  gigs = 'gigs',
  apps = 'apps',
  post = 'post',
  templates = 'templates',
}

export interface DropdownOption {
  displayName: string,
  icon?: ReactElement,
  id?: string,
  onClick?: () => void,
}

export interface Employer {
  id: string,
  name: string,
  email: string,
}

export interface EmployerReview {
  id: string,
  employer: string,
  userId?: string,
  rating: number,
  headline: string,
  title: string,
  isCurrentEmployee: boolean,
  city: string,
  state: string,
  abbrevState: string,
  datePosted: string,
  summary: string,
  positiveFeedbackCounter: number,
  negativeFeedbackCounter: number,
}

export interface Feedback {
  mood?: number,
  positiveTraits?: string[],
  negativeTraits?: string[],
  technicalFit?: number,
  culturalFit?: number,
  additionalNotes?: string,
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

export interface MessageTemplate {
  id: string,
  employerId: string,
  name: string,
  template: string,
}

export interface PopulatedApplication {
  id: string,
  gig: Gig,
  userId: string,
  status: ApplicationStatus,
}

export interface Position {
  title: string,
  employer: string,
  highlights: string,
}

export interface Resume {
  id: string,
  name: string,
  userId: string,
}

export enum ReviewFormFieldOptions {
  city = 'city',
  headline = 'headline',
  isCurrentEmployee = 'isCurrentEmployee',
  rating = 'rating',
  summary = 'summary',
  title = 'title',
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
