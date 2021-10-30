import { createContext, useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { FilterContextType } from './types';

const FilterFormContext = createContext<undefined | FilterContextType>(undefined);

const FilterProvider = (props: object) => {
  return <FilterFormContext.Provider value={UseProvideFilter()} {...props} />;
};

function UseProvideFilter(): FilterContextType {
  const { search } = useLocation();
  const history = useHistory();

  const getFilters = (search: string): Array<string> => {
    const searchParams = new URLSearchParams(search);
    const searchFilters = searchParams.get('filters');
    return searchFilters ?  searchFilters.split(',') : [];
  };

  const addFilter = (filter: string): void => {
    if (filter) {
      const searchParams = new URLSearchParams(search);
      let searchFilters = searchParams.get('filters') || '';
      searchFilters += (searchFilters === '') ? filter : `,${filter}`;
      searchParams.set('filters', searchFilters);
      setFilters(searchFilters.split(','));
      history.replace({ search: searchParams.toString() });
    }
  }

  const deleteFilter = (filter: string): void => {
    if (filter) {
      const searchParams = new URLSearchParams(search);
      const searchFilters = searchParams.get('filters');
      if (searchFilters) {
        const filters = searchFilters.split(',').filter(x => x !== filter);
        setFilters(filters);
        filters.length
          ? searchParams.set('filters', filters.join(','))
          : searchParams.delete('filters');
        history.replace({ search: searchParams.toString() });
      }
    }
  }

  const [filters, setFilters] = useState<Array<string>>(getFilters(search));

  const onKeyPress = (e: any): void => {
    if (e.key === 'Enter') {
      addFilter(e.target.value);
    }
  };

  return {
    filters,
    deleteFilter,
    onKeyPress,
  };
}

const useFilter = () => {
  const context = useContext(FilterFormContext);
  if (context === undefined) {
    throw new Error("useFilter should only be used within the FilterProvider.");
  }
  return context;
}

export { FilterProvider, useFilter };
