import { ReactElement, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from 'providers/auth';
import { AuthFormProvider } from 'providers/auth_form';
import { UserProvider } from 'providers/user';
import Header from 'routes/components/header';
import settings from 'settings';

const CreatePage = (): ReactElement => {
  const history = useHistory();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      history.replace(settings.FIND_ROUTE);
    }
  }, [history, user]);

  return (
    <UserProvider>
      <div id='create-page' >
        <AuthFormProvider>
          <Header />
        </AuthFormProvider>
      </div>
    </UserProvider>
  )
}

export default CreatePage;
