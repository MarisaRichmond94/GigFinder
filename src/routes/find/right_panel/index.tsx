import './index.scss';

import { ReactElement } from 'react';

import ActionButtons from 'routes/find/right_panel/action_buttons';
import ActiveResume from 'routes/find/right_panel/active_resume';
import Filters from 'routes/find/right_panel/filters';

const RightPanel = (): ReactElement => {
  return (
    <div id='right-panel'>
      <ActionButtons />
      <ActiveResume />
      <Filters />
    </div>
  );
}

export default RightPanel;
