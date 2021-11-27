import './index.scss';

import { ReactElement, useState } from 'react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { FiThumbsDown, FiThumbsUp } from 'react-icons/fi';

import GigButton from 'components/gig_button';
import settings from 'settings';
import { CompanyReview } from 'types';

type ReviewProps = {
  review: CompanyReview,
}

const Review = (props: ReviewProps): ReactElement => {
  const { id, rating, headline, title, is_current_employee } = props.review;
  const { city, abbrev_state, date_posted, summary } = props.review;

  const [isReviewed, setIsReviewed] = useState(false);

  const getStars = (): ReactElement[] => {
    const reviewRating = rating % 1 === 0 ? `${rating}.0` : rating;
    const stars = [];
    const [wholeStars, isHalfStar] = reviewRating.toString().split('.');
    while (stars.length < wholeStars) {
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
    const dateParts = date_posted.split(/[- :]/);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const postedDate = new Date(...dateParts);
    return postedDate.toLocaleDateString("en-US", options);
  }

  const employeeTitle = `${title}${is_current_employee ? ' (Current Employee)' : ''}`;
  const location = `${city}, ${abbrev_state}`;
  const datePosted = getDatePosted();
  const reviewFeedbackText = 'Was this review helpful?';

  return (
    <>
      <div className='company-review-container'>
        <div className='rating-container'>
          <div className='rating'>{rating}</div>
          {getStars()}
        </div>
        <div className='details-container'>
          <div className='review-text bold sub-header-text' title={headline}>{headline}</div>
          <div className='review-text sub-header-text' title={employeeTitle}>{employeeTitle}</div>
          <div className='review-text sub-header-text' title={location}>{location}</div>
          <div className='review-text sub-header-text' title={datePosted}>{datePosted}</div>
          <div className='summary sub-header-text'>{summary}</div>
          {
            isReviewed
              ? (
                <div className='review-text sub-header-text review-feedback-container'>
                  Thanks for your feedback!
                </div>
              )
              : (
                <div className='review-feedback-container'>
                  <div
                    className='review-text sub-header-text review-feedback'
                    title={reviewFeedbackText}
                  >
                    {reviewFeedbackText}
                  </div>
                  <GigButton
                    classNames='review-feedback-button icon-button primary-green'
                    id={`review-positive-feedback-button-${id}`}
                    onClick={() => setIsReviewed(true)}
                    textBlock={<FiThumbsUp />}
                  />
                  <GigButton
                    classNames='review-feedback-button icon-button primary-red'
                    id={`review-negative-feedback-button-${id}`}
                    onClick={() => setIsReviewed(true)}
                    textBlock={<FiThumbsDown />}
                  />
                </div>
              )
          }
        </div>
      </div>
      <hr className='review-divider' />
    </>
  );
}

export default Review;
