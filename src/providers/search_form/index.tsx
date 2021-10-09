import { createContext, KeyboardEvent, useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { debounce } from 'throttle-debounce';

import useQuery from 'hooks/useQuery';
import settings from 'settings';
import { Option, SearchFormContextType } from './types';

const SearchFormContext = createContext<undefined | SearchFormContextType>(undefined);

const SearchFormProvider = (props: object) => {
  return <SearchFormContext.Provider value={UseProvideSearchForm()} {...props} />;
};

function UseProvideSearchForm(): SearchFormContextType {
  const history = useHistory();
  const { search } = useLocation();
  const query = useQuery();

  const [title, setTitle] = useState(query.get('title') || '');
  const [location, setLocation] = useState(query.get('location') || '');
  const [type, setType] = useState<undefined | Option>(
    settings.typeOptions.find(x => x.displayName === query.get('type')) || undefined
  );
  const [debounceUpdateSearch] = useState(
    () => debounce(500, false, (key: string, value: string): void => {
      updateSearch(key, value);
    }),
  );

  const updateSearch = (key: string, value: string): void => {
    const searchParams = new URLSearchParams(search);
    if (searchParams.get(key)) {
      value
        ? searchParams.set(key, value)
        : searchParams.delete(key)
    } else if (value !== '') {
      searchParams.set(key, value);
    }

    history.replace({ search: searchParams.toString() });
  };

  const updateInput = (type: string, value: string | Option): void => {
    switch (type) {
      case 'title':
        if (typeof value === 'string') setTitle(value);
        break;
      case 'location':
        if (typeof value === 'string') setLocation(value);
        break;
      case 'type':
        if (typeof value === 'object') setType(value);
        break;
      default:
        break;
    }

    if (search) {
      (typeof value === 'string')
        ? debounceUpdateSearch(type, value)
        : updateSearch(type, value.displayName);
    }
  };

  const onFormSubmit = (): void => {
    let search = `?type=${type?.displayName || 'any'}`;
    if (title) search += `&title=${encodeURI(title)}`;
    if (location) search += `&location=${encodeURI(location)}`;

    history.push({
      pathname: settings.searchRoute,
      search,
    });
  };

  const onKeyPress = (e: KeyboardEvent): void => {
    if (e.key === 'Enter') {
      onFormSubmit();
    }
  };

  return {
    location,
    title,
    type,
    onFormSubmit,
    onKeyPress,
    updateInput,
  };
}

const useSearchForm = () => {
  const context = useContext(SearchFormContext);
  if (context === undefined) {
    throw new Error("useSearchForm should only be used within the SearchFormProvider.");
  }
  return context;
}

export { SearchFormProvider, useSearchForm };
