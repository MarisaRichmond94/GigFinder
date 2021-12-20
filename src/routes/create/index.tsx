import './index.scss';

import { ReactElement, useEffect } from 'react';

import GigLoader from 'components/gig_loader';
import { useAuth } from 'providers/auth';
import { useEmployer } from 'providers/employer';
import Header from 'routes/components/header';
import CenterPanel from 'routes/create/center_panel';
import LoginPrompt from 'routes/create/components/login_prompt';
import RightPanel from 'routes/create/right_panel';

const CreatePage = (): ReactElement => {
  // context variables and functions
  const { employer, isLoggedIn, isLoggingIn } = useAuth();
  const { getGigs } = useEmployer();
  // derived variables
  const employerId = employer?.id;
  const employerName = employer?.name;

  useEffect(() => {
    if (employerId && employerName) {
      getGigs(employerName);
    }
  }, [employerId, employerName, getGigs]);

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

  if (isLoggingIn) {
    return (
      <div id='authenticating-page'>
        <GigLoader color='#5BA1C5' type='cylon'/>
        <div className='thick header-text text-center' id='auth-text'>Authenticating...</div>
      </div>
    );
  }

  return isLoggedIn ? AuthenticatedView : UnauthenticatedView;
}

export default CreatePage;
