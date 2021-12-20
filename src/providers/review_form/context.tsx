import { createContext } from 'react';

import { EmployerReview, ReviewFormFieldOptions } from 'types';

interface ReviewFormContextType {
  city?: string,
  headline: string,
  isCurrentEmployee?: boolean,
  locationOptions?: string[],
  rating?: number,
  summary: string,
  title: string,
  titleOptions?: string[],
  userEmployerReviews: EmployerReview[],
  getIsValidInput: (type: ReviewFormFieldOptions | 'all') => boolean,
  resetForm: () => void,
  submitReviewForm: (employer: string) => EmployerReview,
  updateField: (key: ReviewFormFieldOptions, value: string | number | boolean) => void,
}

const ReviewFormContext = createContext<undefined | ReviewFormContextType>(undefined);

export default ReviewFormContext;
