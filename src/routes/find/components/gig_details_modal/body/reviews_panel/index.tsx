import { ReactElement, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import GigLoader from 'components/gig_loader';
import { useUser } from 'providers/user';
import Review from 'routes/find/components/gig_details_modal/body/reviews_panel/review';
import settings from 'settings';

const ReviewPanel = (): ReactElement => {
  const { employerReviews } = useUser();
  const [resultsCount, setResultsCount] = useState(0);

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

  const buildEmployerReviews = (): ReactElement[] => {
    return employerReviews.map(
      employerReview => <Review review={employerReview} key={`review-${employerReview.id}`}/>
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

  return (
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
  );
}

export default ReviewPanel;
