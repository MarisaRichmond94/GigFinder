import { createContext } from 'react';

import { Gig, GigWithReviews, Option, SearchParameters } from 'types';

interface SearchContextType {
  activeGig?: GigWithReviews,
  filterOptions?: string[],
  filteredResults?: Gig[],
  gigTypes?: Option[],
  searchFilters: string[],
  searchResults?: Gig[],
  debounceUpdateSearch: (searchParameters: SearchParameters) => void,
  deleteSearchFilter: (filter: string) => void,
  onFilterSelect: (filter: string) => void,
  onSearchFormSubmit: () => void,
  updateActiveGig: (matchingGig: Gig) => void,
}

const SearchFormContext = createContext<undefined | SearchContextType>(undefined);

export default SearchFormContext;
