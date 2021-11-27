import { createContext } from 'react';

interface AppContextType {
  unusableCenterPanelHeight: number,
  unusableRightPanelHeight: number,
  calculateTotalHeight: () => void,
}

const AppContext = createContext<undefined | AppContextType>(undefined);

export default AppContext;
