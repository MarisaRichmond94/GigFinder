import './index.scss';

import { ReactElement } from 'react';

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
  // derived variables
  const hasUserReviewed = !!userEmployerReviews.find(x => x.employer === activeGig.employer);

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
          : <ReviewPanel hasUserReviewed={hasUserReviewed} />
      }
    </div>
  );
};

export default Body;
