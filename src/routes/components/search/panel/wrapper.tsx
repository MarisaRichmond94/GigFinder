import { ReactElement } from 'react';

import { SearchProvider } from 'providers/search';
import SearchPanel from './index';


const SearchPanelWrapper = (): ReactElement => {
  return (
    <SearchProvider>
      <SearchPanel />
    </SearchProvider>
  );
}

export default SearchPanelWrapper;
