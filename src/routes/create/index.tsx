import './index.scss';

import { ReactElement } from 'react';

import GigLoader from 'components/gig_loader';
import { useAuth } from 'providers/auth';
import Header from 'routes/components/header';
import CenterPanel from 'routes/create/center_panel';
import LoginPrompt from 'routes/create/components/login_prompt';
import RightPanel from 'routes/create/right_panel';

const CreatePage = (): ReactElement => {
  // provider variables and functions
  const { isLoggedIn, isLoggingIn } = useAuth();

  if (isLoggingIn) {
    return (
      <div id='authenticating-page'>
        <GigLoader color='#5BA1C5' type='cylon'/>
        <div className='thick header-text text-center' id='auth-text'>Authenticating...</div>
      </div>
    );
  };

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

  return isLoggedIn ? AuthenticatedView : UnauthenticatedView;
};

export default CreatePage;
