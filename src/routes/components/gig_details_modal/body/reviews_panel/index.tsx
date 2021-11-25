import './index.scss';

import { ReactElement, useEffect, useState } from 'react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { FiThumbsDown, FiThumbsUp } from 'react-icons/fi';
import InfiniteScroll from 'react-infinite-scroll-component';

import GigButton from 'components/gig_button';
import GigLoader from 'components/gig_loader';
import settings from 'settings';
import { CompanyReview } from 'types';

type ReviewPanelProps = {
  companyReviews: CompanyReview[],
}

const ReviewPanel = (props: ReviewPanelProps): ReactElement => {
  const [resultsCount, setResultsCount] = useState(0);

  useEffect(() => {
    if (props.companyReviews?.length) {
      setResultsCount(
        props.companyReviews.length >= settings.MIN_RESULTS_PER_LOAD
          ? settings.MIN_RESULTS_PER_LOAD
          : props.companyReviews.length
      );
    }
    // eslint-disable-next-line
  }, [props.companyReviews]);

  const buildCompanyReviews = (): ReactElement[] => {
    return props.companyReviews.map(
      companyReview => <Review review={companyReview} key={`review-${companyReview.id}`}/>
    );
  }

  const getMoreCompanyReviews = (): void => {
    const nextResultsCount = resultsCount + settings.MIN_RESULTS_PER_LOAD;
    setResultsCount(
      nextResultsCount <= props.companyReviews.length
        ? nextResultsCount
        : props.companyReviews.length
    );
  };

  return (
    <div className='gig-modal-body-panel' id='gig-details-modal-review-panel'>
      <InfiniteScroll
        dataLength={resultsCount}
        next={getMoreCompanyReviews}
        hasMore={resultsCount !== props.companyReviews.length}
        loader={<GigLoader color='#5BA1C5' height='5%' type='cylon'/>}
        scrollableTarget='gig-details-modal-review-panel'
      >
        {buildCompanyReviews()}
      </InfiniteScroll>
    </div>
  );
}

type ReviewProps = {
  review: CompanyReview,
}

const Review = (props: ReviewProps): ReactElement => {
  const { id, rating, headline, title, is_current_employee } = props.review;
  const { city, abbrev_state, date_posted, summary } = props.review;

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
          <div className='review-text bold-sub-header-text' title={headline}>{headline}</div>
          <div className='review-text sub-header-text' title={employeeTitle}>{employeeTitle}</div>
          <div className='review-text sub-header-text' title={location}>{location}</div>
          <div className='review-text sub-header-text' title={datePosted}>{datePosted}</div>
          <div className='summary sub-header-text'>{summary}</div>
          <div className='review-feedback-container'>
            <div className='review-text sub-header-text review-feedback' title={reviewFeedbackText}>
              {reviewFeedbackText}
            </div>
            <GigButton
              classNames='review-feedback-button review-positive-feedback-button'
              id={`review-positive-feedback-button-${id}`}
              onClick={() => console.log('approve')}
              textBlock={<FiThumbsUp />}
            />
            <GigButton
              classNames='review-feedback-button review-negative-feedback-button'
              id={`review-negative-feedback-button-${id}`}
              onClick={() => console.log('disapprove')}
              textBlock={<FiThumbsDown />}
            />
          </div>
        </div>
      </div>
      <hr className='review-divider' />
    </>
  );
}

export default ReviewPanel;
