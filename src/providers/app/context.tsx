import { createContext } from 'react';

interface AppContextType {

}

const AppContext = createContext<undefined | AppContextType>(undefined);

export default AppContext;
