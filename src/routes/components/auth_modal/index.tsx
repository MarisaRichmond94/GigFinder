import './index.scss';

import { ReactElement } from 'react';

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

  const headerContent = (
    <div id='auth-header-container'>
      {isSignUp ? 'Create An Account' : 'Sign In'}
    </div>
  );

  return (
    <div id='auth-panel'>
      <GigModal
        bodyContent={<Body />}
        headerContent={headerContent}
        footerContent={<Footer setIsOpen={props.setIsOpen} />}
        id='auth-modal'
        isOpen={props.isOpen}
      />
    </div>
  );
}

export default AuthModal;
