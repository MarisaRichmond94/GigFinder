import './index.scss';

import { ReactElement } from 'react';

import GigButton from 'components/gig_button';
import { useAuth } from 'providers/auth';
import { useAuthForm } from 'providers/auth_form';

type FooterProps = {
  setIsOpen: (isOpen: boolean) => void,
}

const Footer = (props: FooterProps): ReactElement => {
  const { email, isSignUp, isUserAuth, name, getIsValidInput } = useAuthForm();
  const { loginEmployer, loginUser, signUpEmployer, signUpUser } = useAuth();
  const isSubmitEnabled = isSignUp
    ? getIsValidInput('name') && getIsValidInput('email') && getIsValidInput('password')
    : getIsValidInput('email') && getIsValidInput('password');

  const cancel = (): void => props.setIsOpen(false);

  const handleFormSubmit = (): void => {
    if (isSignUp) {
      isUserAuth ? signUpUser(name, email) : signUpEmployer(name, email);
    } else {
      isUserAuth ? loginUser(email) : loginEmployer(email);
    }
    props.setIsOpen(false);
  }

  return (
    <div id='auth-footer-container'>
      <GigButton
        classNames='medium-grey-gig-button sub-header-text'
        id='auth-modal-cancel-button'
        onClick={cancel}
        text='Cancel'
      />
      <GigButton
        classNames='secondary-blue-gig-button sub-header-text'
        id='auth-modal-auth-button'
        isDisabled={!isSubmitEnabled}
        onClick={handleFormSubmit}
        text={isSignUp ? 'Sign Me Up!' : 'Sign Me In!'}
      />
    </div>
  );
}

export default Footer;
