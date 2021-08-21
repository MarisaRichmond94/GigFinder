import { ReactElement } from 'react';

import Header from 'routes/components/header/header';
import CenterPanel from './center_panel';
import RightPanel from './right_panel';

const SearchPage = (): ReactElement => {
  return (
    <div id='page-container'>
      <Header />
      <CenterPanel />
      <RightPanel />
    </div>
  )
}

export default SearchPage;
