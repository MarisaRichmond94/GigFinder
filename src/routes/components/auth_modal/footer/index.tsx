import { ReactElement, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

import GigButton from 'components/gig_button';
import { useAuth } from 'providers/auth';
import { useAuthForm } from 'providers/auth_form';
import settings from 'settings';
import { AuthFieldType } from 'types';

type FooterProps = {
  setIsOpen: (isOpen: boolean) => void,
};

const Footer = (props: FooterProps): ReactElement => {
  // provider variables and functions
  const { isSignUp, isUserAuth } = useAuthForm();
  const { getIsValidInput, resetForm, setIsApplicationSignUp } = useAuthForm();
  const { loginEmployer, loginUser, signUpEmployer, signUpUser } = useAuth();
  // hook variables
  const { pathname } = useLocation();
  // destructured props
  const { setIsOpen } = props;
  // derived variables
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

  const close = useCallback((): void => {
    setIsOpen(false);
    resetForm();
    setIsApplicationSignUp(pathname === settings.FIND_ROUTE);
  }, [pathname, resetForm, setIsApplicationSignUp, setIsOpen]);

  const handleFormSubmit = useCallback((): void => {
    if (isSignUp) isUserAuth ? signUpUser(close) : signUpEmployer(close);
    else isUserAuth ? loginUser(close) : loginEmployer(close);
  }, [close, isSignUp, isUserAuth, loginEmployer, loginUser, signUpEmployer, signUpUser]);

  return (
    <div id='auth-footer-container'>
      <GigButton
        classNames='medium-grey dark-background sub-header-text'
        id='auth-modal-cancel-button'
        onClick={close}
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
};

export default Footer;
