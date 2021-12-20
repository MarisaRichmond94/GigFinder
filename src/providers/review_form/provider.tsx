import { useCallback, useEffect, useState } from 'react';

import LocationsApi from 'api/locations';
import TitlesApi from 'api/titles';
import { useAuth } from 'providers/auth';
import { useUser } from 'providers/user';
import ReviewFormContext from 'providers/review_form/context';
import { ReviewFormFieldOptions } from 'types';
import generateGUID from 'utils/generateGUID';
import EmployerReviewsApi from 'api/employer_reviews';

const ReviewFormProvider = (props: object) => {
  const { user } = useAuth();
  const { addReviewToEmployerReviews } = useUser();
  const userId = user?.id;

  const [city, setCity] = useState<string | undefined>();
  const [headline, setHeadline] = useState('');
  const [isCurrentEmployee, setIsCurrentEmployee] = useState(false);
  const [rating, setRating] = useState(0);
  const [summary, setSummary] = useState('');
  const [title, setTitle] = useState('');

  const [userEmployerReviews, setUserEmployerReviews] = useState([]);
  const [locationOptions, setLocationOptions] = useState<string[] | undefined>();
  const [titleOptions, setTitleOptions] = useState<string[] | undefined>();

  useEffect(() => {
    async function populateFormOptions() {
      // locations
      const locationOptionsResponse = await LocationsApi.get();
      setLocationOptions(locationOptionsResponse);
      // titles
      const titleOptionsResponse = await TitlesApi.get();
      setTitleOptions(titleOptionsResponse);
    };

    populateFormOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function populateUserEmployerReviews() {
      const employerReviews = await EmployerReviewsApi.get({ userId });
      setUserEmployerReviews(employerReviews);
    }

    if (userId) {
      populateUserEmployerReviews();
    }
  }, [userId]);

  const updateField = useCallback(
    (key: ReviewFormFieldOptions, value: string | number | boolean): void => {
      switch (key) {
        case ReviewFormFieldOptions.city:
          if (typeof value === 'string' && locationOptions?.find(x => x === value)) setCity(value);
          break;
        case ReviewFormFieldOptions.headline:
          if (typeof value === 'string') setHeadline(value);
          break;
        case ReviewFormFieldOptions.isCurrentEmployee:
          if (typeof value === 'boolean') setIsCurrentEmployee(value);
          break;
        case ReviewFormFieldOptions.rating:
          if (typeof value === 'number') setRating(value);
          break;
        case ReviewFormFieldOptions.summary:
          if (typeof value === 'string') setSummary(value);
          break;
        case ReviewFormFieldOptions.title:
          if (typeof value === 'string' && titleOptions?.find(x => x === value)) setTitle(value);
          break;
      }
    },
    [locationOptions, titleOptions],
  );

  const getIsValidInput = useCallback((type: ReviewFormFieldOptions | 'all'): boolean => {
    switch (type) {
      case ReviewFormFieldOptions.city:
        return !!(city && locationOptions?.find(x => x === city));
      case ReviewFormFieldOptions.headline:
        return !!headline.length;
      case ReviewFormFieldOptions.rating:
        return rating > 0;
      case ReviewFormFieldOptions.summary:
        return !!summary.length;
      case ReviewFormFieldOptions.title:
        return !!title.length;
      case 'all':
        return !!(
          city &&
          locationOptions?.find(x => x === city) &&
          headline.length &&
          rating > 0 &&
          summary.length &&
          titleOptions.find(x => x === title) &&
          title.length
        );
      default:
        return false;
    }
  }, [city, headline, rating, summary, title, locationOptions, titleOptions]);

  const resetForm = useCallback((): void => {
    setCity(undefined);
    setHeadline('');
    setIsCurrentEmployee(false);
    setRating(0);
    setSummary('');
    setTitle('');
  }, []);

  const submitReviewForm = useCallback(async (employer: string) => {
    const employerReview = {
      id: generateGUID(),
      employer,
      userId,
      rating,
      headline,
      title,
      isCurrentEmployee,
      city,
      state: 'California',
      abbrevState: 'CA',
      datePosted: new Date().toISOString(),
      summary,
      positiveFeedbackCounter: 0,
      negativeFeedbackCounter: 0,
    };
    await EmployerReviewsApi.post(employerReview);
    setUserEmployerReviews([...userEmployerReviews, employerReview]);
    resetForm();
    addReviewToEmployerReviews(employerReview);
  }, [
    city, headline, isCurrentEmployee, rating, summary, title, userEmployerReviews, userId,
    addReviewToEmployerReviews, resetForm,
  ]);

  const value = {
    city,
    headline,
    isCurrentEmployee,
    locationOptions,
    rating,
    summary,
    title,
    titleOptions,
    userEmployerReviews,
    getIsValidInput,
    resetForm,
    submitReviewForm,
    updateField,
  };

  return <ReviewFormContext.Provider value={value} {...props} />;
};

export default ReviewFormProvider;
