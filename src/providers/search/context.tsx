import { createContext } from 'react';

import { SearchContextType } from './types';

const SearchFormContext = createContext<undefined | SearchContextType>(undefined);

export default SearchFormContext;
