import { ReactElement } from 'react';

import { SearchProvider } from 'providers/search';
import Header from 'routes/components/header';

import CenterPanel from 'routes/find/center_panel';
import RightPanel from 'routes/find/right_panel';

const FindPage = (): ReactElement => {
  return (
    <SearchProvider>
      <div id='page-container'>
        <Header />
        <CenterPanel />
        <RightPanel />
      </div>
    </SearchProvider>
  )
}

export default FindPage;
