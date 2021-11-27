import { ReactElement, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import GigLoader from 'components/gig_loader';
import Review from 'routes/components/gig_details_modal/body/reviews_panel/review';
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

export default ReviewPanel;
