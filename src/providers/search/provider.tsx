import { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { debounce } from 'throttle-debounce';

import BenefitsApi from 'api/benefits';
import TypesApi from 'api/types';
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
      for (const [key, value] of Object.entries(searchParameters)) {
        if (value !== '') searchParams.set(key, value);
      }
      history.replace({ search: searchParams.toString() });

      // search gigs and update search results if on the find page
      if (pathname === settings.FIND_ROUTE) {
        searchGigs();
      }
    }),
  );

  useEffect(() => {
    async function populateGigTypes() {
      const gigTypesResponse = await TypesApi.get();
      setGigTypes(gigTypesResponse);
    };

    async function initializeFindRoute() {
      const benefitsResponse = await BenefitsApi.get();
      setFilterOptions(benefitsResponse);
    }

    populateGigTypes();
    if (pathname === settings.FIND_ROUTE) {
      searchGigs();
      initializeFindRoute();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchGigs = useCallback((): void => {
    setSearchResults(undefined);
    setFilteredResults(undefined);
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
  }, [gigTypes, searchFilters, setFilteredResults, setSearchResults]);

  const onSearchFormSubmit = useCallback((): void => {
    history.push({
      pathname: settings.FIND_ROUTE,
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
      if (updatedFilters.length) {
        const filteredResults = filterSearchResults(searchResults, updatedFilters);
        setFilteredResults(filteredResults);
      } else {
        setFilteredResults(undefined);
      }
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

