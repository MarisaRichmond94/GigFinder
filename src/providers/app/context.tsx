import { createContext } from 'react';

interface AppContextType {
  // companyName: string,
  // isLoggedIn: boolean,
  // userName: string,
  // createCompanyAccount: (name: string) => void,
  // createUserAccount: (name: string) => void,
  // loginCompany: () => void,
  // loginUser: () => void,
  // logout: () => void,
}

const AppContext = createContext<undefined | AppContextType>(undefined);

export default AppContext;
