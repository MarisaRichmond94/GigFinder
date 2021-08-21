import { ReactElement } from 'react';

import SearchPanel from 'routes/components/search_panel/search_panel';

const CenterPanel = (): ReactElement => {
  return (
    <div id='center-panel'>
      <SearchPanel />
    </div>
  );
}

export default CenterPanel;
