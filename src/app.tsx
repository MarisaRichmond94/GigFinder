import { ReactElement } from 'react';

import { AuthProvider } from 'providers/auth';
import GigRouter from 'routes/router';

const App = (): ReactElement => {
  return (
    <AuthProvider>
      <GigRouter />
    </AuthProvider>
  );
}

export default App;
