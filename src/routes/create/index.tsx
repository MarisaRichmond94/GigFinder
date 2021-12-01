import './index.scss';

import { ReactElement, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from 'providers/auth';
import { AuthFormProvider } from 'providers/auth_form';
import { UserProvider } from 'providers/user';
import Header from 'routes/components/header';
import LoginPrompt from 'routes/create/components/login_prompt';
import settings from 'settings';

const CreatePage = (): ReactElement => {
  const history = useHistory();
  const { user, isLoggedIn } = useAuth();

  useEffect(() => {
    if (user) {
      history.replace(settings.FIND_ROUTE);
    }
  }, [history, user]);

  return (
    <UserProvider>
      <AuthFormProvider>
      <div id={isLoggedIn ? 'create-page' : 'create-page-login'}>
        {isLoggedIn && <Header />}
        {isLoggedIn ? <div id='replace-me-later'></div> : <LoginPrompt />}
      </div>
      </AuthFormProvider>
    </UserProvider>
  )
}

export default CreatePage;
