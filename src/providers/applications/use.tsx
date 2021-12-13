import { useContext } from 'react';

import ApplicationsContext from 'providers/applications/context';

const useApplications = () => {
  const context = useContext(ApplicationsContext);
  if (context === undefined) {
    throw new Error('useApplications should only be used within the ApplicationsProvider.');
  }
  return context;
}

export default useApplications;
