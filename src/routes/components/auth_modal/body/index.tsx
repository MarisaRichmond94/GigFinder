import './index.scss';

import { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';

import GigButton from 'components/gig_button';
import { useAuthForm } from 'providers/auth_form';
import EmailInput from 'routes/components/auth_modal/inputs/email';
import NameInput from 'routes/components/auth_modal/inputs/name';
import PasswordInput from 'routes/components/auth_modal/inputs/password';
import settings from 'settings';

const Body = (): ReactElement => {
  const { isUserAuth, isSignUp, resetForm, setIsApplicationSignUp } = useAuthForm();
  const { pathname } = useLocation();

  const handleSignUpSelectorClick = (updatedisUserAuth: boolean): void => {
    if (updatedisUserAuth !== isUserAuth) {
      setIsApplicationSignUp(updatedisUserAuth);
      resetForm();
    }
  }

  return (
    <div id='auth-body-container' className={pathname === settings.FIND_ROUTE ? 'find' : 'create'}>
      <div id='auth-selector-container'>
        <GigButton
          classNames={`${isUserAuth ? 'active ' : ''}underline-text off-white header-text`}
          id='applicant-selector-button'
          onClick={() => handleSignUpSelectorClick(true)}
          text="Applicant"
        />
        <GigButton
          classNames={`${!isUserAuth ? 'active ' : ''}underline-text off-white header-text`}
          id='employer-selector-button'
          onClick={() => handleSignUpSelectorClick(false)}
          text="Employer"
        />
      </div>
      <hr id='auth-selector-divider' />
      <div id='auth-form-container'>
        {isSignUp && <NameInput />}
        <EmailInput />
        <PasswordInput />
      </div>
    </div>
  );
}

export default Body;
