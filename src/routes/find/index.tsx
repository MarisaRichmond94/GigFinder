import { ReactElement } from 'react';

import { SearchProvider } from 'providers/search';
import Header from 'routes/components/header';
import { AuthFormProvider } from 'providers/auth_form';
import { UserProvider } from 'providers/user';
import CenterPanel from 'routes/find/center_panel';
import RightPanel from 'routes/find/right_panel';

const FindPage = (): ReactElement => {
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
