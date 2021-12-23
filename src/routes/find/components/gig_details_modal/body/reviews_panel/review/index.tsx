import './index.scss';

import { ReactElement, useCallback, useState } from 'react';
import { FiThumbsDown, FiThumbsUp } from 'react-icons/fi';

import GigButton from 'components/gig_button';
import { getDatePosted, getStars } from 'libs/reviews';
import { useUser } from 'providers/user';
import { EmployerReview } from 'types';

type ReviewProps = {
  review: EmployerReview,
  userId?: string,
};

const Review = (props: ReviewProps): ReactElement => {
  // context provider variables and functions
  const { submitReviewFeedback } = useUser();
  // local state variables and functions
  const [isReviewed, setIsReviewed] = useState(false);
  // prop variables
  const { review } = props;
  const { id, rating, headline, title, isCurrentEmployee } = review;
  const { city, abbrevState, datePosted, summary, userId: reviewUserId } = review;
  const { positiveFeedbackCounter, negativeFeedbackCounter } = review;

  const submitFeedback = useCallback((isPositive: boolean): void => {
    setIsReviewed(true);
    submitReviewFeedback(review, isPositive);
    setTimeout(() => { setIsReviewed(false); }, 3000);
  }, [review, submitReviewFeedback]);

  const employeeTitle = `${title}${isCurrentEmployee ? ' (Current Employee)' : ''}`;
  const location = `${city}, ${abbrevState}`;
  const postedDate = getDatePosted(datePosted);
  const reviewFeedbackText = 'Was this review helpful?';

  const feedback = (
    <>
      <div className='sub-header-text review-feedback-counter'>
        <GigButton
          classNames='review-feedback-button header-text icon-button primary-green'
          id={`review-positive-feedback-button-${id}`}
          onClick={() => submitFeedback(true)}
          textBlock={<FiThumbsUp />}
        />
        <div>{positiveFeedbackCounter}</div>
      </div>
      <div className='sub-header-text review-feedback-counter'>
        <GigButton
          classNames='review-feedback-button icon-button primary-red'
          id={`review-negative-feedback-button-${id}`}
          onClick={() => submitFeedback(false)}
          textBlock={<FiThumbsDown />}
        />
        <div>{negativeFeedbackCounter}</div>
      </div>
    </>
  );

  return (
    <>
      <div className='employer-review-container'>
        <div className='rating-container'>
          <div className='small-title-text'>{rating}</div>
          {getStars(rating)}
        </div>
        <div className='details-container'>
          <div className='review-text bold sub-header-text' title={headline}>{headline}</div>
          <div className='review-text sub-header-text' title={employeeTitle}>{employeeTitle}</div>
          <div className='review-text sub-header-text' title={location}>{location}</div>
          <div className='review-text sub-header-text' title={postedDate}>{postedDate}</div>
          <div className='summary sub-header-text'>{summary}</div>
          {
            props.userId !== reviewUserId &&
            <div className='review-feedback-container'>
              <div
                className='review-text sub-header-text review-feedback'
                title={reviewFeedbackText}
              >
                {reviewFeedbackText}
              </div>
              {
                isReviewed
                  ? (
                    <div className='thick review-text sub-header-text review-feedback-container'>
                      Thanks for your feedback!
                    </div>
                  )
                  : feedback
                }
            </div>
            }
        </div>
      </div>
      <hr />
    </>
  );
};

export default Review;
