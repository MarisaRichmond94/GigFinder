import { ReactElement } from 'react';

import { SearchFormProvider } from 'providers/search_form';
import SearchPanel from './index';


const SearchPanelWrapper = (): ReactElement => {
  return (
    <SearchFormProvider>
      <SearchPanel />
    </SearchFormProvider>
  );
}

export default SearchPanelWrapper;
