import './index.scss';

import { ReactElement } from 'react';

import { Application } from 'types';

type FeedbackPanelProps = {
  application: Application,
}

const FeedbackPanel = (props: FeedbackPanelProps): ReactElement => {
  // destructured prop variables
  if (!props.application) return null;
  const { candidate } = props.application;

  return (
    <div id='application-feedback-panel'>
      Feedback
    </div>
  );
}

export default FeedbackPanel;
