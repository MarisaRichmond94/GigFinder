import { ReactElement, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { SearchProvider } from 'providers/search';
import Header from 'routes/components/header';
import { useAuth } from 'providers/auth';
import { AuthFormProvider } from 'providers/auth_form';
import { UserProvider } from 'providers/user';
import CenterPanel from 'routes/find/center_panel';
import RightPanel from 'routes/find/right_panel';
import settings from 'settings';

const FindPage = (): ReactElement => {
  const history = useHistory();
  const { employer } = useAuth();

  useEffect(() => {
    if (employer) {
      history.replace(settings.CREATE_ROUTE);
    }
  }, [employer, history]);

  return (
    <UserProvider>
      <SearchProvider>
        <div id='page-container'>
          <AuthFormProvider>
            <Header />
          </AuthFormProvider>
          <CenterPanel />
          <RightPanel />
        </div>
      </SearchProvider>
    </UserProvider>
  )
}

export default FindPage;
