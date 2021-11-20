import './index.scss';

import { ReactElement } from 'react';

import GigButton from 'components/gig_button';
import { useAuthForm } from 'providers/auth_form';
import EmailInput from 'routes/components/auth_modal/inputs/email';
import NameInput from 'routes/components/auth_modal/inputs/name';
import PasswordInput from 'routes/components/auth_modal/inputs/password';

const Body = (): ReactElement => {
  const { isUserAuth, isSignUp, resetForm, setIsApplicationSignUp } = useAuthForm();

  const handleSignUpSelectorClick = (updatedisUserAuth: boolean): void => {
    if (updatedisUserAuth !== isUserAuth) {
      setIsApplicationSignUp(updatedisUserAuth);
      resetForm();
    }
  }

  return (
    <div id='auth-body-container'>
      <div id='auth-selector-container'>
        <GigButton
          classNames={`${isUserAuth ? 'active ' : ''}text-gig-button off-white header-text`}
          id='applicant-selector-button'
          onClick={() => handleSignUpSelectorClick(true)}
          text="I'm an applicant"
        />
        <GigButton
          classNames={`${!isUserAuth ? 'active ' : ''}text-gig-button off-white header-text`}
          id='employer-selector-button'
          onClick={() => handleSignUpSelectorClick(false)}
          text="I'm an employer"
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
