import { createContext } from 'react';

import { Gig, Option, SearchParameters } from 'types';

interface SearchContextType {
  filterOptions?: string[],
  filteredResults?: Gig[],
  gigTypes?: Option[],
  searchFilters: string[],
  searchResults?: Gig[],
  debounceUpdateSearch: (searchParameters: SearchParameters) => void,
  deleteSearchFilter: (filter: string) => void,
  onFilterSelect: (filter: string) => void,
  onSearchFormSubmit: () => void,
}

const SearchFormContext = createContext<undefined | SearchContextType>(undefined);

export default SearchFormContext;
