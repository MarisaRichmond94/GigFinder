import './index.scss';

import { ReactElement, useState } from 'react';

import GigButton from 'components/gig_button';
import { useAuth } from 'providers/auth';
import { useAuthForm } from 'providers/auth_form';
import AuthModal from 'routes/components/auth_modal';

const ActionButtons = (): ReactElement => {
  const { isLoggedIn, logout } = useAuth();
  const { setIsSignUp } = useAuthForm();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleLoginUser = (): void => {
    setIsAuthModalOpen(true);
    setIsSignUp(false);
  }

  const handleSignUpUser = (): void => {
    setIsAuthModalOpen(true);
    setIsSignUp(true);
  }

  return isLoggedIn
    ? (
      <div id='action-button-wrapper'>
        <div id='right-panel-action-buttons'>
          <GigButton
            classNames='secondary-blue-gig-button sub-header-text'
            id='upload-resume-button'
            onClick={() => console.log('Upload Resume')}
            text='Upload Resume'
          />
          <GigButton
            classNames='secondary-blue-gig-button sub-header-text'
            id='sign-out-button'
            onClick={logout}
            text='Sign Out'
          />
        </div>
      </div>
    )
    : (
      <div id='action-button-wrapper'>
        <AuthModal
          isOpen={isAuthModalOpen}
          setIsOpen={setIsAuthModalOpen}
        />
        <div id='right-panel-action-buttons'>
          <GigButton
            classNames='secondary-blue-gig-button sub-header-text'
            id='create-account-button'
            onClick={handleSignUpUser}
            text='Create Account'
          />
          <GigButton
            classNames='secondary-blue-gig-button sub-header-text'
            id='sign-in-button'
            onClick={handleLoginUser}
            text='Sign In'
          />
        </div>
        <div className='sub-header sub-header-text'>
          Create an account or sign in to ensure none of your favorite gigs get lost!
        </div>
      </div>
    );
}

export default ActionButtons;
