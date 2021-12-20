import { ReactElement } from 'react';

import { AuthProvider } from 'providers/auth';
import { AuthFormProvider } from 'providers/auth_form';
import GigRouter from 'routes/router';

const App = (): ReactElement => {
  return (
    <AuthFormProvider>
      <AuthProvider>
        <GigRouter />
      </AuthProvider>
    </AuthFormProvider>
  );
}

export default App;
