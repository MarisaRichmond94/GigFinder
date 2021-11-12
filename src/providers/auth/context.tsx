import { createContext } from 'react';

import { AuthContextType } from './types';

const AuthContext = createContext<undefined | AuthContextType>(undefined);

export default AuthContext;
