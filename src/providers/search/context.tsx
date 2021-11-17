import { createContext } from 'react';

import { Option, SearchParameters, SearchResult } from 'types';

interface SearchContextType {
  filterOptions?: string[],
  filteredResults?: SearchResult[],
  gigTypes?: Option[],
  searchFilters: string[],
  searchResults?: SearchResult[],
  debounceUpdateSearch: (searchParameters: SearchParameters) => void,
  deleteSearchFilter: (filter: string) => void,
  onFilterSelect: (filter: string) => void,
  onSearchFormSubmit: () => void,
}

const SearchFormContext = createContext<undefined | SearchContextType>(undefined);

export default SearchFormContext;
