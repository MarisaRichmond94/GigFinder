import './index.scss';

import { ReactElement, useCallback, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import icon from 'assets/icons/reviews.svg';
import GigButton from 'components/gig_button';
import GigLoader from 'components/gig_loader';
import buildNoPanelContent from 'libs/no_panel_content';
import { useAuth } from 'providers/auth';
import { useReviewForm } from 'providers/review_form';
import { useUser } from 'providers/user';
import Review from 'routes/find/components/gig_details_modal/body/reviews_panel/review';
import ReviewForm from 'routes/find/components/gig_details_modal/body/reviews_panel/review_form';
import settings from 'settings';

type ReviewPanelProps = {
  hasUserReviewed: boolean,
};

const ReviewPanel = (props: ReviewPanelProps): ReactElement => {
  const { isLoggedIn, user } = useAuth();
  const userId = user?.id;
  const { resetForm, submitReviewForm } = useReviewForm();
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

  const buildEmployerReviews = useCallback((): ReactElement | ReactElement[] => {
    if (!employerReviews.length) {
      return buildNoPanelContent('There are no reviews for this employer', icon, true);
    }

    return employerReviews.map(
      employerReview =>
        <Review review={employerReview} key={`review-${employerReview.id}`} userId={userId}/>
    );
  }, [employerReviews, userId]);

  const getMoreEmployerReviews = useCallback((): void => {
    const nextResultsCount = resultsCount + settings.MIN_RESULTS_PER_LOAD;
    setResultsCount(
      nextResultsCount <= employerReviews.length
        ? nextResultsCount
        : employerReviews.length
    );
  }, [employerReviews.length, resultsCount]);

  const submitReview = useCallback((): void => {
    submitReviewForm(activeGig.employer);
    setIsReviewForm(false);
  }, [activeGig.employer, submitReviewForm]);

  const cancelReview = useCallback((): void => {
    resetForm();
    setIsReviewForm(false);
  }, [resetForm]);

  return isReviewForm
    ? <ReviewForm cancelReview={cancelReview} submitReview={submitReview} />
    : (
      <>
        <div className='find-gig-modal-body-panel' id='gig-details-modal-review-panel'>
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
          isLoggedIn && !props.hasUserReviewed &&
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
};

export default ReviewPanel;
