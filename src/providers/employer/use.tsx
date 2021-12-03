import { useContext } from 'react';

import EmployerContext from 'providers/employer/context';

const useEmployer = () => {
  const context = useContext(EmployerContext);
  if (context === undefined) {
    throw new Error("useEmployer should only be used within the EmployerProvider.");
  }
  return context;
}

export default useEmployer;
