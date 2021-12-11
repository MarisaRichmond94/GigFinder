import { useContext } from 'react';

import SearchFormContext from 'providers/search/context';

const useSearch = () => {
  const context = useContext(SearchFormContext);
  if (context === undefined) {
    throw new Error('useSearch should only be used within the SearchProvider.');
  }
  return context;
}

export default useSearch;
