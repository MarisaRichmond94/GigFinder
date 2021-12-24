import './index.scss';

import { ReactElement, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

import logo from 'assets/icons/logo.png';
import DemoWarning from 'components/demo_warning';
import GigButton from 'components/gig_button';
import { useAuthForm } from 'providers/auth_form';
import AuthModal from 'routes/components/auth_modal';

const LoginPrompt = (): ReactElement => {
  // hook variables
  const history = useHistory();
  // provider variables and functions
  const { setIsSignUp } = useAuthForm();
  // local state variables and functions
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleLoginUser = useCallback((): void => {
    setIsAuthModalOpen(true);
    setIsSignUp(false);
  }, [setIsSignUp]);

  const handleSignUpUser = useCallback((): void => {
    setIsAuthModalOpen(true);
    setIsSignUp(true);
  }, [setIsSignUp]);

  return (
    <div id='create-login-prompt'>
      <DemoWarning />
      <div className='logo-container' onClick={() => history.push('/')}>
        <img alt='logo' className='gig-search-icon' src={logo} />
        <div className='bold title-text gig-search-title'>Gig Search</div>
      </div>
      <div className='bold title-text login-prompt-header'>You're here to hire.</div>
      <div className='bold title-text login-prompt-header'>We're here to help.</div>
      <div className='sub-title-text' id='login-prompt-sub-header'>
        Helping you navigate the hiring process with ease from start to finish.
      </div>
      <div className='auth-buttons'>
        <AuthModal isOpen={isAuthModalOpen} setIsOpen={setIsAuthModalOpen} />
        <GigButton
          classNames='primary-blue dark-background sub-header-text'
          id='create-account-button'
          onClick={handleSignUpUser}
          text='Create Account'
        />
        <GigButton
          classNames='primary-blue dark-background sub-header-text'
          id='sign-in-button'
          onClick={handleLoginUser}
          text='Sign In'
        />
      </div>
    </div>
  );
};

export default LoginPrompt;
