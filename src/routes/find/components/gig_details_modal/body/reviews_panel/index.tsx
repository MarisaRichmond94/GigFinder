import { ReactElement, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import GigLoader from 'components/gig_loader';
import Review from 'routes/find/components/gig_details_modal/body/reviews_panel/review';
import settings from 'settings';
import { EmployerReview } from 'types';

type ReviewPanelProps = {
  employerReviews: EmployerReview[],
}

const ReviewPanel = (props: ReviewPanelProps): ReactElement => {
  const [resultsCount, setResultsCount] = useState(0);

  useEffect(() => {
    if (props.employerReviews?.length) {
      setResultsCount(
        props.employerReviews.length >= settings.MIN_RESULTS_PER_LOAD
          ? settings.MIN_RESULTS_PER_LOAD
          : props.employerReviews.length
      );
    }
    // eslint-disable-next-line
  }, [props.employerReviews]);

  const buildEmployerReviews = (): ReactElement[] => {
    return props.employerReviews.map(
      employerReview => <Review review={employerReview} key={`review-${employerReview.id}`}/>
    );
  }

  const getMoreEmployerReviews = (): void => {
    const nextResultsCount = resultsCount + settings.MIN_RESULTS_PER_LOAD;
    setResultsCount(
      nextResultsCount <= props.employerReviews.length
        ? nextResultsCount
        : props.employerReviews.length
    );
  };

  return (
    <div className='gig-modal-body-panel' id='gig-details-modal-review-panel'>
      <InfiniteScroll
        dataLength={resultsCount}
        next={getMoreEmployerReviews}
        hasMore={resultsCount !== props.employerReviews.length}
        loader={<GigLoader color='#5BA1C5' height='5%' type='cylon'/>}
        scrollableTarget='gig-details-modal-review-panel'
      >
        {buildEmployerReviews()}
      </InfiniteScroll>
    </div>
  );
}

export default ReviewPanel;
