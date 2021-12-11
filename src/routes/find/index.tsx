import { ReactElement, useEffect } from 'react';

import { SearchProvider } from 'providers/search';
import Header from 'routes/components/header';
import { useAuth } from 'providers/auth';
import { AuthFormProvider } from 'providers/auth_form';
import { useUser } from 'providers/user';
import CenterPanel from 'routes/find/center_panel';
import RightPanel from 'routes/find/right_panel';

const FindPage = (): ReactElement => {
  // context variables and functions
  const { user } = useAuth();
  const { getFavoriteGigs, getGigApplications, getResumes } = useUser();
  // derived variables
  const userId = user?.id;

  useEffect(() => {
    if (userId) {
      getFavoriteGigs(userId);
      getResumes(userId);
      getGigApplications(userId);
    }
  }, [getFavoriteGigs, getGigApplications, getResumes, userId]);

  return (
    <SearchProvider>
      <div className='page-container' id='find-page'>
        <AuthFormProvider>
          <Header />
        </AuthFormProvider>
        <CenterPanel />
        <RightPanel />
      </div>
    </SearchProvider>
  )
}

export default FindPage;
