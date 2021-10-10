import { ReactElement } from 'react';

import ActionButtons from './action_buttons';

type RightPanelProps = {
}

const RightPanel = (props: RightPanelProps): ReactElement => {
  return (
    <div id='right-panel' style={{ backgroundColor: '#083F89' }} >
      <ActionButtons />
    </div>
  );
}

export default RightPanel;
