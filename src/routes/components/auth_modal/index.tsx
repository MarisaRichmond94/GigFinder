import './index.scss';

import { ReactElement, useRef } from 'react';

import GigModal from 'components/gig_modal';
import useElementResize from 'hooks/useElementResize';
import { useAuthForm } from 'providers/auth_form';
import Body from 'routes/components/auth_modal/body';
import Footer from 'routes/components/auth_modal/footer';

const MAX_CONTENT_WIDTH = 1200;

type AuthModalProps = {
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void,
}

const AuthModal = (props: AuthModalProps): ReactElement => {
  const { isSignUp } = useAuthForm();

  const contentRef = useRef(null);
  const contentWidth = useElementResize(contentRef);
  console.log({contentWidth})

  const headerContent = (
    <div id='auth-header-container'>
      {isSignUp ? 'Create An Account' : 'Sign In'}
    </div>
  );

  return (
    <div id='auth-modal' className={(contentWidth === MAX_CONTENT_WIDTH) ? 'max-content-width' : ''}>
      <GigModal
        bodyContent={<Body />}
        headerContent={headerContent}
        footerContent={<Footer setIsOpen={props.setIsOpen} />}
        id='auth-modal'
        isOpen={props.isOpen}
        contentRef={contentRef}
      />
    </div>
  );
}

export default AuthModal;
