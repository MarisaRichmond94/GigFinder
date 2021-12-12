import { createContext } from 'react';

import { Gig, GigType, SearchParameters } from 'types';

interface SearchContextType {
  filterOptions?: string[],
  filteredResults?: Gig[],
  locationOptions?: string[],
  searchFilters: string[],
  searchResults?: Gig[],
  titleOptions?: string[],
  typeOptions?: GigType[],
  debounceUpdateSearch: (searchParameters: SearchParameters) => void,
  deleteSearchFilter: (filter: string) => void,
  onFilterSelect: (filter: string) => void,
  onSearchFormSubmit: () => void,
}

const SearchFormContext = createContext<undefined | SearchContextType>(undefined);

export default SearchFormContext;
