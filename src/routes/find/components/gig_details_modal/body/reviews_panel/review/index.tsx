import './index.scss';

import { ReactElement, useState } from 'react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { FiThumbsDown, FiThumbsUp } from 'react-icons/fi';

import GigButton from 'components/gig_button';
import { useUser } from 'providers/user';
import { EmployerReview } from 'types';

type ReviewProps = {
  review: EmployerReview,
  userId?: string,
}

const Review = (props: ReviewProps): ReactElement => {
  // context provider variables and functions
  const { submitReviewFeedback } = useUser();
  // local state variables and functions
  const [isReviewed, setIsReviewed] = useState(false);
  // prop variables
  const { id, rating, headline, title, isCurrentEmployee } = props.review;
  const { city, abbrevState, datePosted, summary, userId: reviewUserId } = props.review;
  const { positiveFeedbackCounter, negativeFeedbackCounter } = props.review;

  const getStars = (): ReactElement => {
    const reviewRating = rating % 1 === 0 ? `${rating}.0` : rating;
    const stars = [];
    const [wholeStars, isHalfStar] = reviewRating.toString().split('.');
    while (stars.length < parseInt(wholeStars)) {
      stars.push(<BsStarFill className='rating-star' key={`star-${stars.length + 1}`} />);
    }
    if (isHalfStar !== '0') {
      stars.push(<BsStarHalf className='rating-star' key={`star-${stars.length + 1}`} />);
    }
    while (stars.length < 5) {
      stars.push(<BsStar className='rating-star' key={`star-${stars.length + 1}`} />);
    }

    return <div className='rating-stars'>{stars}</div>;
  }

  const getDatePosted = (): string => {
    const dateParts = datePosted.split(/[- :]/);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    // @ts-ignore
    const postedDate = new Date(...dateParts);
    // @ts-ignore
    return postedDate.toLocaleDateString('en-US', options);
  }

  const submitFeedback = (isPositive: boolean): void => {
    setIsReviewed(true);
    submitReviewFeedback(props.review, isPositive);
    setTimeout(() => { setIsReviewed(false); }, 3000);
  };

  const employeeTitle = `${title}${isCurrentEmployee ? ' (Current Employee)' : ''}`;
  const location = `${city}, ${abbrevState}`;
  const postedDate = getDatePosted();
  const reviewFeedbackText = 'Was this review helpful?';

  return (
    <>
      <div className='employer-review-container'>
        <div className='rating-container'>
          <div className='rating'>{rating}</div>
          {getStars()}
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
                  : (
                    <>
                      <div className='sub-header-text review-feedback-counter'>
                        <GigButton
                          classNames='review-feedback-button icon-button primary-green'
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
                  )
                }
            </div>
            }
        </div>
      </div>
      <hr className='review-divider' />
    </>
  );
}

export default Review;
