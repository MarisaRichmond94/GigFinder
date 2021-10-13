import './index.scss';

import { ReactElement } from 'react';

import ActionButtons from './action_buttons';
import ActiveResume from './active_resume';

type RightPanelProps = {
}

const RightPanel = (props: RightPanelProps): ReactElement => {
  return (
    <div id='right-panel' style={{ backgroundColor: '#083F89' }} >
      <ActionButtons />
      <ActiveResume />
    </div>
  );
}

export default RightPanel;
