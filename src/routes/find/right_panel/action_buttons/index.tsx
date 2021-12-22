import './index.scss';

import { ReactElement } from 'react';

import GigButton from 'components/gig_button';
import { useAuth } from 'providers/auth';
import { useAuthForm } from 'providers/auth_form';

type ActionButtonsProps = {
  setIsAuthModalOpen?: (isAuthModalOpen: boolean) => void,
  setIsUploadModalOpen: (isUploadModalOpen: boolean) => void,
}

const ActionButtons = (props: ActionButtonsProps): ReactElement => {
  const { isLoggedIn, logout } = useAuth();
  const { setIsSignUp } = useAuthForm();

  const handleLoginUser = (): void => {
    props.setIsAuthModalOpen(true);
    setIsSignUp(false);
  }

  const handleSignUpUser = (): void => {
    props.setIsAuthModalOpen(true);
    setIsSignUp(true);
  }

  return isLoggedIn
    ? (
      <div id='action-button-wrapper'>
        <div id='right-panel-action-buttons'>
          <GigButton
            classNames='secondary-blue dark-background sub-header-text'
            id='upload-resume-button'
            onClick={() => props.setIsUploadModalOpen(true)}
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
    )
    : (
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
}

export default ActionButtons;
