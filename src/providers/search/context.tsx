import { createContext } from 'react';

import { SearchParameters, SearchResult } from 'types';

interface SearchContextType {
  searchFilters: string[],
  searchResults?: SearchResult[],
  debounceUpdateSearch: (searchParameters: SearchParameters) => void,
  deleteSearchFilter: (filter: string) => void,
  onFilterKeyPress: (e: any) => void,
  onSearchFormSubmit: () => void,
}

const SearchFormContext = createContext<undefined | SearchContextType>(undefined);

export default SearchFormContext;
