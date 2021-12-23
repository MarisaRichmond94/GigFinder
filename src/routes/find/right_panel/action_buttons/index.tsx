import './index.scss';

import { ReactElement, useCallback } from 'react';

import GigButton from 'components/gig_button';
import { useAuth } from 'providers/auth';
import { useAuthForm } from 'providers/auth_form';

type ActionButtonsProps = {
  setIsAuthModalOpen: (isAuthModalOpen: boolean) => void,
  setIsUploadModalOpen: (isUploadModalOpen: boolean) => void,
}

const ActionButtons = (props: ActionButtonsProps): ReactElement => {
  // provider variables and functions
  const { isLoggedIn, logout } = useAuth();
  const { setIsSignUp } = useAuthForm();
  const { setIsAuthModalOpen, setIsUploadModalOpen } = props;

  const handleLoginUser = useCallback((): void => {
    setIsAuthModalOpen(true);
    setIsSignUp(false);
  }, [setIsAuthModalOpen, setIsSignUp]);

  const handleSignUpUser = useCallback((): void => {
    setIsAuthModalOpen(true);
    setIsSignUp(true);
  }, [setIsAuthModalOpen, setIsSignUp]);

  const authenticatedView = (
    <div id='action-button-wrapper'>
      <div id='right-panel-action-buttons'>
        <GigButton
          classNames='secondary-blue dark-background sub-header-text'
          id='upload-resume-button'
          onClick={() => setIsUploadModalOpen(true)}
          text='Upload Resume'
        />
        <GigButton
          classNames='secondary-blue dark-background sub-header-text'
          id='sign-out-button'
          onClick={logout}
          text='Sign Out'
        />
      </div>
    </div>
  );

  const unauthenticatedView = (
    <div id='action-button-wrapper'>
      <div id='right-panel-action-buttons'>
        <GigButton
          classNames='secondary-blue dark-background sub-header-text'
          id='create-account-button'
          onClick={handleSignUpUser}
          text='Create Account'
        />
        <GigButton
          classNames='secondary-blue dark-background sub-header-text'
          id='sign-in-button'
          onClick={handleLoginUser}
          text='Sign In'
        />
      </div>
      <div className='white text sub-header-text text-center'>
        Create an account or sign in to ensure none of your favorite gigs get lost!
      </div>
    </div>
  );

  return isLoggedIn ? authenticatedView : unauthenticatedView;
};

export default ActionButtons;
