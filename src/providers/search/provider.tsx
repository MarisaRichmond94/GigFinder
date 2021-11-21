import { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { debounce } from 'throttle-debounce';

import SearchFormContext from 'providers/search/context';
import { buildSearchUrl } from 'providers/search/utils/buildSearchUrl';
import {
  createSearchFilter,
  deleteFilterFromUrl,
  filterSearchResults,
  getSearchFilters,
} from 'providers/search/utils/filters';
import settings from 'settings';
import { Gig, Option, SearchParameters } from 'types';

const SearchProvider = (props: object) => {
  const history = useHistory();
  const { pathname, search } = useLocation();

  const [filterOptions, setFilterOptions] = useState<string[] | undefined>();
  const [filteredResults, setFilteredResults] = useState<Gig[] | undefined>();
  const [gigTypes, setGigTypes] = useState<Option[] | undefined>();
  const [searchFilters, setSearchFilters] = useState<string[]>(getSearchFilters(search));
  const [searchResults, setSearchResults] = useState<Gig[] | undefined>(undefined);

  // This is a hack to prevent the debounce function from rebuilding and restarting the debounce
  const [debounceUpdateSearch] = useState(
    () => debounce(250, false, (searchParameters: SearchParameters): void => {
      // update search parameters in the url
      const searchParams = new URLSearchParams();
      searchParameters['filters'] = searchFilters ? searchFilters.join(',') : '';
      for (const [key, value] of Object.entries(searchParameters)) {
        if (value !== '') searchParams.set(key, value);
      }
      history.replace({ search: searchParams.toString() });

      // search gigs and update search results if on the find page
      if (pathname === settings.SEARCH_ROUTE) {
        searchGigs();
      }
    }),
  );

  useEffect(() => {
    getGigTypes();
    if (pathname === settings.SEARCH_ROUTE) {
      searchGigs();
      getFilterOptions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getGigTypes = useCallback((): void => {
    fetch('http://localhost:8080/types')
      .then(response => response.json())
      .then(types => setGigTypes(types));
  }, []);

  const getFilterOptions = useCallback((): void => {
    fetch('http://localhost:8080/filters')
      .then(response => response.json())
      .then(filters => setFilterOptions(filters));
  }, []);

  const searchGigs = useCallback((): void => {
    setSearchResults(undefined);
    setTimeout(() => {
      const url = buildSearchUrl(gigTypes);
      fetch(url)
        .then(response => response.json())
        .then(results => {
          if (searchFilters.length) {
            const filteredResults = filterSearchResults(results, searchFilters);
            setFilteredResults(filteredResults);
          }
          setSearchResults(results);
        });
    }, 2000);
  }, [gigTypes, searchFilters]);

  const onSearchFormSubmit = useCallback((): void => {
    history.push({
      pathname: settings.SEARCH_ROUTE,
      search,
    });
  }, [history, search]);

  const onFilterSelect = useCallback((filter: string): void => {
    const updatedFilters = createSearchFilter(filter, search, history);
    setSearchFilters(updatedFilters);
    const filteredResults = filterSearchResults(searchResults, updatedFilters);
    setFilteredResults(filteredResults);
  }, [history, search, searchResults]);

  const deleteSearchFilter = useCallback((filter: string): void => {
    if (filter) {
      const updatedFilters = deleteFilterFromUrl(filter, search, history);
      setSearchFilters(updatedFilters);
      const filteredResults = filterSearchResults(searchResults, updatedFilters);
      setFilteredResults(filteredResults);
    }
  }, [history, search, searchResults]);

  const value = {
    filterOptions,
    filteredResults,
    gigTypes,
    searchFilters,
    searchResults,
    debounceUpdateSearch,
    deleteSearchFilter,
    onFilterSelect,
    onSearchFormSubmit,
  };

  return <SearchFormContext.Provider value={value} {...props} />;
};

export default SearchProvider;

