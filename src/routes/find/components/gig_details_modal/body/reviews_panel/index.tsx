import { ReactElement, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import noResultsIcon from 'assets/icons/reviews.svg';
import GigButton from 'components/gig_button';
import GigLoader from 'components/gig_loader';
import buildNoPanelContent from 'libs/no_panel_content';
import { useAuth } from 'providers/auth';
import { useReviewForm } from 'providers/review_form';
import { useUser } from 'providers/user';
import Review from 'routes/find/components/gig_details_modal/body/reviews_panel/review';
import ReviewForm from 'routes/find/components/gig_details_modal/body/reviews_panel/review_form';
import settings from 'settings';

const ReviewPanel = (): ReactElement => {
  const { isLoggedIn, user } = useAuth();
  const userId = user?.id;
  const { userEmployerReviews, getIsValidInput, resetForm, submitReviewForm } = useReviewForm();
  const { activeGig, employerReviews } = useUser();
  const [resultsCount, setResultsCount] = useState(0);
  const [isReviewForm, setIsReviewForm] = useState(false);

  useEffect(() => {
    if (employerReviews?.length) {
      setResultsCount(
        employerReviews.length >= settings.MIN_RESULTS_PER_LOAD
          ? settings.MIN_RESULTS_PER_LOAD
          : employerReviews.length
      );
    }
    // eslint-disable-next-line
  }, [employerReviews]);

  const buildEmployerReviews = (): ReactElement | ReactElement[] => {
    if (!employerReviews.length) {
      return buildNoPanelContent(
        'There are no reviews for this employer',
        noResultsIcon,
        true,
      );
    }

    return employerReviews.map(
      employerReview =>
        <Review review={employerReview} key={`review-${employerReview.id}`} userId={userId}/>
    );
  }

  const getMoreEmployerReviews = (): void => {
    const nextResultsCount = resultsCount + settings.MIN_RESULTS_PER_LOAD;
    setResultsCount(
      nextResultsCount <= employerReviews.length
        ? nextResultsCount
        : employerReviews.length
    );
  };

  const submitReview = (): void => {
    submitReviewForm(activeGig.employer);
    setIsReviewForm(false);
  }

  const cancelReview = (): void => {
    resetForm()
    setIsReviewForm(false);
  }

  return isReviewForm
    ? (
      <>
        <ReviewForm />
        <div id='review-panel-actions-container'>
          <GigButton
            classNames='sub-header-text medium-grey'
            id='write-a-review-button'
            onClick={() => cancelReview()}
            text='Cancel'
          />
          <GigButton
            classNames='sub-header-text primary-blue'
            id='write-a-review-button'
            isDisabled={!getIsValidInput('all')}
            onClick={() => submitReview()}
            text='Submit Review'
          />
        </div>
      </>
    )
    : (
      <>
        <div className='gig-modal-body-panel' id='gig-details-modal-review-panel'>
          <InfiniteScroll
            dataLength={resultsCount}
            next={getMoreEmployerReviews}
            hasMore={resultsCount !== employerReviews.length}
            loader={<GigLoader color='#5BA1C5' height='5%' type='cylon'/>}
            scrollableTarget='gig-details-modal-review-panel'
          >
            {buildEmployerReviews()}
          </InfiniteScroll>
        </div>
        {
          isLoggedIn && !userEmployerReviews.find(x => x.employer === activeGig.employer) &&
          <div id='review-panel-actions-container'>
            <GigButton
              classNames='sub-header-text primary-blue'
              id='write-a-review-button'
              onClick={() => setIsReviewForm(true)}
              text='Write A Review'
            />
          </div>
        }
      </>
    );
}

export default ReviewPanel;
