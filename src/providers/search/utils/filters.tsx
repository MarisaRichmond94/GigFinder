import { Gig } from 'types';

interface historyType {
  replace: (entry: object) => void,
}

const createSearchFilter = (filter: string, search: string, history: historyType): string[] => {
  const searchParams = new URLSearchParams(search);
  let searchFilters = searchParams.get('filters') || '';
  searchFilters += (searchFilters === '') ? filter : `,${filter}`;
  searchParams.set('filters', searchFilters);
  history.replace({ search: searchParams.toString() });

  return searchFilters.split(',');
}

const deleteFilterFromUrl = (filter: string, search: string, history: historyType): string[] => {
  const searchParams = new URLSearchParams(search);
  const searchFilters = searchParams.get('filters');
  if (searchFilters) {
    const filters = searchParams.get('filters').split(',').filter(x => x !== filter);
    filters.length
      ? searchParams.set('filters', filters.join(','))
      : searchParams.delete('filters');
    history.replace({ search: searchParams.toString() });

    return filters;
  }

  return [];
}

const filterSearchResults = (searchResults: Gig[], filters: string[]): Gig[] => {
  return searchResults?.filter(result =>
    filters.every(filter => result.benefits.indexOf(filter) >= 0)
  );
}

const getSearchFilters = (search: string): string[] => {
  const searchParams = new URLSearchParams(search);
  const searchFilters = searchParams.get('filters');
  return searchFilters ?  searchFilters.split(',') : [];
};

export {
  createSearchFilter,
  deleteFilterFromUrl,
  filterSearchResults,
  getSearchFilters,
}
