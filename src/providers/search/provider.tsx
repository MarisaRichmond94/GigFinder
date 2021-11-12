import { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { debounce } from 'throttle-debounce';

import settings from 'settings';

import SearchFormContext from './context';
import { createSearchFilter, deleteFilterFromUrl, getSearchFilters } from './utils/filters';
import { searchGigs } from './utils/searchGigs';
import { SearchResult } from './types';

const SearchProvider = (props: object) => {
  const history = useHistory();
  const { pathname, search } = useLocation();

  const [searchFilters, setSearchFilters] = useState<string[]>(getSearchFilters(search));
  const [searchResults, setSearchResults] = useState<SearchResult[] | undefined>(undefined);
  const [debounceUpdateSearch] = useState(
    () => debounce(250, false, (key: string, value: string): void => {
      updateSearchInUrl(key, value);
      if (pathname === settings.SEARCH_ROUTE) {
        searchGigs(setSearchResults);
      }
    }),
  );

  useEffect(() => {
    if (pathname === settings.SEARCH_ROUTE) {
      searchGigs(setSearchResults);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateSearchInUrl = (key: string, value: string): void => {
    const searchParams = new URLSearchParams(search);
    if (searchParams.get(key)) {
      value !== ''
        ? searchParams.set(key, value)
        : searchParams.delete(key)
    } else if (value !== '') {
      searchParams.set(key, value);
    }
    history.replace({ search: searchParams.toString() });
  };

  const onSearchFormSubmit = useCallback((): void => {
    history.push({
      pathname: settings.SEARCH_ROUTE,
      search,
    });
  }, [history, search]);

  const onFilterKeyPress = useCallback((e: any): void => {
    if (e.key === 'Enter' && e.target.value) {
      const updatedFilters = createSearchFilter(e.target.value, search, history);
      setSearchFilters(updatedFilters);
    }
  }, [history, search]);

  const deleteSearchFilter = useCallback((filter: string): void => {
    if (filter) {
      const updatedFilters = deleteFilterFromUrl(filter, search, history);
      setSearchFilters(updatedFilters);
    }
  }, [history, search]);

  const value = {
    searchFilters,
    searchResults,
    debounceUpdateSearch,
    deleteSearchFilter,
    onFilterKeyPress,
    onSearchFormSubmit,
  };

  return <SearchFormContext.Provider value={value} {...props} />;
};

export default SearchProvider;
