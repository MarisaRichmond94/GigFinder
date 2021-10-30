import './index.scss';

import { ReactElement } from 'react';

import ActionButtons from './action_buttons';
import ActiveResume from './active_resume';
import Filters from './filters';

const RightPanel = (): ReactElement => {
  return (
    <div id='right-panel' style={{ backgroundColor: '#083F89' }} >
      <ActionButtons />
      <ActiveResume />
      <Filters />
    </div>
  );
}

export default RightPanel;
