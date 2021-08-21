import { createContext, KeyboardEvent, ReactElement, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import settings from 'settings';

interface Option {
  displayName: string,
  icon?: ReactElement,
  onClick?: () => void,
}

interface SearchFormContextType {
  what: string,
  when?: undefined | Option,
  where: string,
  onFormSubmit: () => void,
  onKeyPress: (e: KeyboardEvent) => void,
  updateInput: (type: string, value: string | Option) => void
}

const SearchFormContext = createContext<undefined | SearchFormContextType>(undefined);

const SearchFormProvider = (props: object) => {
  return <SearchFormContext.Provider value={UseProvideSearchForm()} {...props} />;
};

function UseProvideSearchForm(): SearchFormContextType {
  const [what, setWhat] = useState('');
  const [where, setWhere] = useState('');
  const [when, setWhen] = useState<undefined | Option>();

  const history = useHistory();

  const updateInput = (type: string, value: string | Option): void => {
    switch (type) {
      case 'what':
        if (typeof value === 'string') setWhat(value);
        break;
      case 'where':
        if (typeof value === 'string') setWhere(value);
        break;
      case 'when':
        if (typeof value === 'object') setWhen(value);
        break;
      default:
        break;
    }
  };

  const onFormSubmit = (): void => {
    let search = `?type=${when?.displayName.toLowerCase() || 'any'}`;
    if (what) search += `&title=${encodeURI(what.toLowerCase())}`;
    if (where) search += `&location=${encodeURI(where.toLowerCase())}`;

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
    what,
    when,
    where,
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
