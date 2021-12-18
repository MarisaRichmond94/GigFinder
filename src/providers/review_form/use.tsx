import { useContext } from 'react';

import ReviewFormContext from 'providers/review_form/context';

const useReviewForm = () => {
  const context = useContext(ReviewFormContext);
  if (context === undefined) {
    throw new Error('useReviewForm should only be used within the ReviewFormProvider.');
  }
  return context;
}

export default useReviewForm;
