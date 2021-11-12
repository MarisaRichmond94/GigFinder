import { createContext } from 'react';

import { AppContextType } from './types';

const AppContext = createContext<undefined | AppContextType>(undefined);

export default AppContext;
