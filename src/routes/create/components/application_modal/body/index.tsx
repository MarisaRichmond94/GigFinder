import './index.scss';

import { ReactElement, useState } from 'react';

import GigButton from 'components/gig_button';
import DetailsPanel from 'routes/create/components/application_modal/body/details_panel';
import FeedbackPanel from 'routes/create/components/application_modal/body/feedback_panel';
import { Application } from 'types';

type BodyProps = {
  application: Application,
};

const Body = (props: BodyProps): ReactElement => {
  // local state variables and functions
  const [isDetailsPanel, setIsDetailsPanel] = useState(true);

  return (
    <div id='application-modal-body'>
      <div id='application-panel-selector-container'>
        <GigButton
          classNames={`${isDetailsPanel ? 'active ' : ''}underline-text off-black sub-header-text`}
          onClick={() => setIsDetailsPanel(true)}
          text='Details'
        />
        <GigButton
          classNames={`${isDetailsPanel ? '' : 'active '}underline-text off-black sub-header-text`}
          onClick={() => setIsDetailsPanel(false)}
          text='Feedback'
        />
      </div>
      <hr />
      <div id='application-panel-container'>
        {
          isDetailsPanel
            ? <DetailsPanel application={props.application} />
            : <FeedbackPanel application={props.application} />
        }
      </div>
    </div>
  );
};

export default Body;
