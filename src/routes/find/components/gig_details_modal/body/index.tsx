import './index.scss';

import { ReactElement, useState } from 'react';

import GigButton from 'components/gig_button';
import { ReviewFormProvider } from 'providers/review_form';
import DetailPanel from 'routes/find/components/gig_details_modal/body/details_panel';
import ReviewPanel from 'routes/find/components/gig_details_modal/body/reviews_panel';
import { Gig } from 'types';

type BodyProps = {
  gig: Gig,
}

const Body = (props: BodyProps): ReactElement => {
  const [isDetailPanel, setIsDetailPanel] = useState(true);

  return (
    <div id='gig-details-modal-body'>
      <div id='body-panel-selector-container'>
        <GigButton
          classNames={`${isDetailPanel ? 'active ' : ''}underline-text off-black sub-header-text`}
          id='gig-info-selector'
          onClick={() => setIsDetailPanel(true)}
          text='Gig Info'
        />
        <GigButton
          classNames={`${!isDetailPanel ? 'active ' : ''}underline-text off-black sub-header-text`}
          id='review-panel-selector'
          onClick={() => setIsDetailPanel(false)}
          text='Reviews'
        />
      </div>
      {
        isDetailPanel
          ? <DetailPanel gig={props.gig} />
          : (
            <ReviewFormProvider>
              <ReviewPanel />
            </ReviewFormProvider>
          )
      }
    </div>
  );
}

export default Body;
