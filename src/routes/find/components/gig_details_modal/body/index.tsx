import './index.scss';

import { ReactElement, useEffect, useState } from 'react';

import GigButton from 'components/gig_button';
import { useReviewForm } from 'providers/review_form';
import { useUser } from 'providers/user';
import DetailPanel from 'routes/find/components/gig_details_modal/body/details_panel';
import ReviewPanel from 'routes/find/components/gig_details_modal/body/reviews_panel';
import { Gig } from 'types';

type BodyProps = {
  gig: Gig,
  isDetailPanel: boolean,
  setIsDetailPanel: (isDetailPanel: boolean) => void,
};

const Body = (props: BodyProps): ReactElement => {
  // destructured props
  const { gig, isDetailPanel, setIsDetailPanel } = props;
  // provider variables and functions
  const { userEmployerReviews } = useReviewForm();
  const { activeGig } = useUser();
  // local state variables and functions
  const [hasUserReviewed, setHasUserReviewed] = useState(
    !!userEmployerReviews.find(x => x.employer === activeGig.employer),
  );

  useEffect(() => {
    if (activeGig && userEmployerReviews) {
      const isMatchingReview = !!userEmployerReviews.find(x => x.employer === activeGig.employer);
      setHasUserReviewed(isMatchingReview);
    }
  }, [activeGig, activeGig?.employer, userEmployerReviews]);

  return (
    <div id='find-gig-details-modal-body'>
      <div id='body-panel-selector-container'>
        <GigButton
          classNames={`${isDetailPanel ? 'active ' : ''}underline-text off-black sub-header-text`}
          onClick={() => setIsDetailPanel(true)}
          text='Gig Info'
        />
        <GigButton
          classNames={`${!isDetailPanel ? 'active ' : ''}underline-text off-black sub-header-text`}
          onClick={() => setIsDetailPanel(false)}
          text='Reviews'
        />
      </div>
      {
        isDetailPanel
          ? <DetailPanel gig={gig} />
          : (
            <ReviewPanel
              hasUserReviewed={hasUserReviewed}
              setHasUserReviewed={setHasUserReviewed}
            />
          )
      }
    </div>
  );
};

export default Body;
