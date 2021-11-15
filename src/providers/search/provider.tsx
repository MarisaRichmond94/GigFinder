import { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { debounce } from 'throttle-debounce';

import SearchFormContext from 'providers/search/context';
import { buildSearchUrl } from 'providers/search/utils/buildSearchUrl';
import {
  createSearchFilter,
  deleteFilterFromUrl,
  getSearchFilters,
} from 'providers/search/utils/filters';
import settings from 'settings';
import { SearchParameters, SearchResult } from 'types';

const SearchProvider = (props: object) => {
  const history = useHistory();
  const { pathname, search } = useLocation();

  const [searchFilters, setSearchFilters] = useState<string[]>(getSearchFilters(search));
  const [searchResults, setSearchResults] = useState<SearchResult[] | undefined>(undefined);

  // This is a hack to prevent the debounce function from rebuilding and restarting the debounce
  const [debounceUpdateSearch] = useState(
    () => debounce(250, false, (searchParameters: SearchParameters): void => {
      // update search parameters in the url
      const searchParams = new URLSearchParams();
      for (const [key, value] of Object.entries(searchParameters)) {
        if (value !== '') searchParams.set(key, value);
      }
      history.replace({ search: searchParams.toString() });

      // search gigs and update search results if on the find page
      if (pathname === settings.SEARCH_ROUTE) {
        setSearchResults(undefined);
        setTimeout(() => {
          const url = buildSearchUrl();
          fetch(url)
            .then(response => response.json())
            .then(results => {
              setSearchResults(results);
            });
      }, 2000);
      }
    }),
  );

  useEffect(() => {
    // search gigs on page mount if on the find page
    if (pathname === settings.SEARCH_ROUTE) {
      setSearchResults(undefined);
      setTimeout(() => {
        const url = buildSearchUrl();
        fetch(url)
          .then(response => response.json())
          .then(results => {
            setSearchResults(results);
          });
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

