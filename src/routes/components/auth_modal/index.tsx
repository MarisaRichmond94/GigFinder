import { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';

import GigModal from 'components/gig_modal';
import { useAuthForm } from 'providers/auth_form';
import Body from 'routes/components/auth_modal/body';
import Footer from 'routes/components/auth_modal/footer';

type AuthModalProps = {
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void,
}

const AuthModal = (props: AuthModalProps): ReactElement => {
  const { isSignUp } = useAuthForm();
  const { pathname } = useLocation();

  const headerContent = (
    <div id='auth-header-container' className={isSignUp ? 'small-title-text' : 'sub-title-text'}>
      {isSignUp ? 'Create An Account' : 'Sign In'}
    </div>
  );

  return (
    <div id='auth-modal'>
      <GigModal
        bodyContent={<Body />}
        classNames={`${pathname.split('/')[1] === 'create'} primary-blue`}
        headerContent={headerContent}
        footerContent={<Footer setIsOpen={props.setIsOpen} />}
        id='auth-modal'
        isOpen={props.isOpen}
        maxWidth={1000}
      />
    </div>
  );
};

export default AuthModal;
