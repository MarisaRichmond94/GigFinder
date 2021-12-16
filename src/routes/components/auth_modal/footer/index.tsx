import './index.scss';

import { ReactElement } from 'react';

import GigButton from 'components/gig_button';
import { useAuth } from 'providers/auth';
import { useAuthForm } from 'providers/auth_form';
import { AuthFieldType } from 'types';

type FooterProps = {
  setIsOpen: (isOpen: boolean) => void,
}

const Footer = (props: FooterProps): ReactElement => {
  const { email, isSignUp, isUserAuth, name, getIsValidInput, resetForm } = useAuthForm();
  const { loginEmployer, loginUser, signUpEmployer, signUpUser } = useAuth();
  const isSubmitEnabled = isSignUp
    ? (
      getIsValidInput(AuthFieldType.name) &&
      getIsValidInput(AuthFieldType.email) &&
      getIsValidInput(AuthFieldType.password)
    )
    : (
      getIsValidInput(AuthFieldType.email) &&
      getIsValidInput(AuthFieldType.password)
    );

  const cancel = (): void => {
    props.setIsOpen(false);
    resetForm();
  };

  const handleFormSubmit = (): void => {
    if (isSignUp) {
      isUserAuth ? signUpUser(name, email) : signUpEmployer(name, email);
    } else {
      isUserAuth ? loginUser(email) : loginEmployer(email);
    }
    props.setIsOpen(false);
    resetForm();
  }

  return (
    <div id='auth-footer-container'>
      <GigButton
        classNames='medium-grey dark-background sub-header-text'
        id='auth-modal-cancel-button'
        onClick={cancel}
        text='Cancel'
      />
      <GigButton
        classNames='secondary-blue dark-background sub-header-text'
        id='auth-modal-auth-button'
        isDisabled={!isSubmitEnabled}
        onClick={handleFormSubmit}
        text={isSignUp ? 'Sign Me Up!' : 'Sign Me In!'}
      />
    </div>
  );
}

export default Footer;
