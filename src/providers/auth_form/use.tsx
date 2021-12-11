import { useContext } from 'react';

import AuthFormContext from 'providers/auth_form/context';

const useAuthForm = () => {
  const context = useContext(AuthFormContext);
  if (context === undefined) {
    throw new Error('useAuthForm should only be used within the AuthFormProvider.');
  }
  return context;
}

export default useAuthForm;
