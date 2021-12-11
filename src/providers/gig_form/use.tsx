import { useContext } from 'react';

import GigFormContext from 'providers/gig_form/context';

const useGigForm = () => {
  const context = useContext(GigFormContext);
  if (context === undefined) {
    throw new Error('useGigForm should only be used within the GigFormProvider.');
  }
  return context;
}

export default useGigForm;
