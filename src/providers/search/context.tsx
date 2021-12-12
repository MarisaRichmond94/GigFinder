import { createContext } from 'react';

import { Gig, SearchParameters } from 'types';

interface SearchContextType {
  filterOptions?: string[],
  filteredResults?: Gig[],
  locationOptions?: string[],
  searchFilters: string[],
  searchResults?: Gig[],
  titleOptions?: string[],
  typeOptions?: string[],
  debounceUpdateSearch: (searchParameters: SearchParameters) => void,
  deleteSearchFilter: (filter: string) => void,
  onFilterSelect: (filter: string) => void,
  onSearchFormSubmit: () => void,
}

const SearchFormContext = createContext<undefined | SearchContextType>(undefined);

export default SearchFormContext;
