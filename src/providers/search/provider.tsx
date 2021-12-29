import { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { debounce } from 'throttle-debounce';

import BenefitsApi from 'api/benefits';
import LocationsApi from 'api/locations';
import TypesApi from 'api/types';
import TitlesApi from 'api/titles';
import SearchFormContext from 'providers/search/context';
import { buildSearchUrl } from 'providers/search/utils/buildSearchUrl';
import {
  createSearchFilter,
  deleteFilterFromUrl,
  filterSearchResults,
  getSearchFilters,
} from 'providers/search/utils/filters';
import settings from 'settings';
import { Gig, FilterAction, SearchParameters } from 'types';

const SearchProvider = (props: object) => {
  // hook variables
  const history = useHistory();
  const { pathname, search } = useLocation();

  // local state variables and functions
  const [filterOptions, setFilterOptions] = useState<string[] | undefined>();
  const [filteredResults, setFilteredResults] = useState<Gig[] | undefined>();
  const [locationOptions, setLocationOptions] = useState<string[] | undefined>();
  const [titleOptions, setTitleOptions] = useState<string[] | undefined>();
  const [typeOptions, setTypeOptions] = useState<string[] | undefined>();
  const [searchFilters, setSearchFilters] = useState<string[]>(getSearchFilters(search));
  const [searchResults, setSearchResults] = useState<Gig[] | undefined>(undefined);

  // derived variables
  const results = filteredResults || searchResults;

  // This is a hack to prevent the debounce function from rebuilding and restarting the debounce
  const [debounceUpdateSearch] = useState(
    () => debounce(
      250, false, (searchParameters: SearchParameters, typeOptions?: string[]): void => {
        const searchParams = new URLSearchParams();
        for (const [key, value] of Object.entries(searchParameters)) {
          if (value !== '') searchParams.set(key, value);
        }
        history.replace({ search: searchParams.toString() });
        if (pathname === settings.FIND_ROUTE) searchGigs(typeOptions);
      }
    ),
  );

  useEffect(() => {
    async function populateFormOptions() {
      // locations
      const locationOptionsResponse = await LocationsApi.get();
      setLocationOptions(locationOptionsResponse);
      // titles
      const titleOptionsResponse = await TitlesApi.get();
      setTitleOptions(titleOptionsResponse);
      // types
      const typeOptionsResponse = await TypesApi.get();
      setTypeOptions(typeOptionsResponse);
      // benefits
      if (pathname === settings.FIND_ROUTE) {
        const benefitsResponse = await BenefitsApi.get();
        setFilterOptions(benefitsResponse);
      }
    };

    populateFormOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchGigs = useCallback((typeOptionsList?: string[]): void => {
    setSearchResults(undefined);
    setFilteredResults(undefined);
    const url = buildSearchUrl(typeOptionsList);
    console.log({url})
    fetch(url)
      .then(response => response.json())
      .then(results => {
        if (searchFilters.length) {
          const filteredResults = filterSearchResults(results, searchFilters);
          setFilteredResults(filteredResults);
        }
        setSearchResults(results);
      });
  }, [searchFilters, setFilteredResults, setSearchResults]);

  const addFilter = useCallback((filter: string): void => {
    const updatedFilters = createSearchFilter(filter, search, history);
    setSearchFilters(updatedFilters);
    const filteredResults = filterSearchResults(searchResults, updatedFilters);
    setFilteredResults(filteredResults);
  }, [history, search, searchResults]);

  const deleteFilter = useCallback((filter: string): void => {
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

  const onFilterAction = useCallback((actionType: FilterAction, filter: string): void => {
    switch (actionType) {
      case FilterAction.add:
        addFilter(filter);
        break;
      case FilterAction.remove:
        deleteFilter(filter);
        break;
    }
  }, [addFilter, deleteFilter]);

  const onSearchFormSubmit = useCallback((): void => {
    history.push({ pathname: settings.FIND_ROUTE, search });
  }, [history, search]);

  const value = {
    filterOptions,
    locationOptions,
    results,
    searchFilters,
    titleOptions,
    typeOptions,
    debounceUpdateSearch,
    onFilterAction,
    onSearchFormSubmit,
  };

  return <SearchFormContext.Provider value={value} {...props} />;
};

export default SearchProvider;

