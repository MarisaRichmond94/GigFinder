import './index.scss';

import { ReactElement, useEffect } from 'react';

import { useAuth } from 'providers/auth';
import { AuthFormProvider } from 'providers/auth_form';
import { useEmployer } from 'providers/employer';
import Header from 'routes/components/header';
import CenterPanel from 'routes/create/center_panel';
import LoginPrompt from 'routes/create/components/login_prompt';
import RightPanel from 'routes/create/right_panel';

const CreatePage = (): ReactElement => {
  // context variables and functions
  const { employer, isLoggedIn } = useAuth();
  const { getGigs, getMessageTemplates } = useEmployer();
  // derived variables
  const employerId = employer?.id;
  const employerName = employer?.name;

  useEffect(() => {
    if (employerId && employerName) {
      getGigs(employerName);
      getMessageTemplates(employerId);
    }
  }, [employerId, employerName, getGigs, getMessageTemplates]);

  const UnauthenticatedView = (
    <div id='create-page-login'>
      <LoginPrompt />
    </div>
  );

  const AuthenticatedView = (
    <div className='page-container' id='create-page'>
      <Header />
      <CenterPanel />
      <RightPanel />
    </div>
  );

  return (
    <AuthFormProvider>
      {isLoggedIn ? AuthenticatedView : UnauthenticatedView}
    </AuthFormProvider>
  )
}

export default CreatePage;
