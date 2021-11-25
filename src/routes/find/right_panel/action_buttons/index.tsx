import './index.scss';

import { ReactElement, useState } from 'react';

import GigButton from 'components/gig_button';
import { useAuth } from 'providers/auth';
import { useAuthForm } from 'providers/auth_form';
import AuthModal from 'routes/components/auth_modal';
import UploadModal from 'routes/components/upload_modal';

const ActionButtons = (): ReactElement => {
  const { isLoggedIn, logout } = useAuth();
  const { setIsSignUp } = useAuthForm();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

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
        <UploadModal isOpen={isUploadModalOpen} setIsOpen={setIsUploadModalOpen} />
        <div id='right-panel-action-buttons'>
          <GigButton
            classNames='secondary-blue-gig-button sub-header-text'
            id='upload-resume-button'
            onClick={() => setIsUploadModalOpen(true)}
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
        <AuthModal isOpen={isAuthModalOpen} setIsOpen={setIsAuthModalOpen} />
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
        <div className='white-text sub-header-text text-center'>
          Create an account or sign in to ensure none of your favorite gigs get lost!
        </div>
      </div>
    );
}

export default ActionButtons;
