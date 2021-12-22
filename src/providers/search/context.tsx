import { createContext } from 'react';

import { Gig, FilterAction, SearchParameters } from 'types';

interface SearchContextType {
  filterOptions?: string[],
  locationOptions?: string[],
  results?: Gig[],
  searchFilters: string[],
  titleOptions?: string[],
  typeOptions?: string[],
  debounceUpdateSearch: (searchParameters: SearchParameters) => void,
  onFilterAction: (actionType: FilterAction, filter: string) => void,
  onSearchFormSubmit: () => void,
}

const SearchFormContext = createContext<undefined | SearchContextType>(undefined);

export default SearchFormContext;
