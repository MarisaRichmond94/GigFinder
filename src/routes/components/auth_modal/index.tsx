import './index.scss';

import { ReactElement, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import GigModal from 'components/gig_modal';
import useElementResize from 'hooks/useElementResize';
import { useAuthForm } from 'providers/auth_form';
import Body from 'routes/components/auth_modal/body';
import Footer from 'routes/components/auth_modal/footer';

const MAX_CONTENT_WIDTH = 1000;

type AuthModalProps = {
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void,
}

const AuthModal = (props: AuthModalProps): ReactElement => {
  const { isSignUp } = useAuthForm();

  const { pathname } = useLocation();
  const contentRef = useRef(null);
  let { width: contentWidth, setWidth: setContentWidth } = useElementResize(contentRef);

  useEffect(() => {
    if (props.isOpen && contentWidth === 0) {
      setContentWidth(contentRef.current?.clientWidth);
    }
  }, [contentWidth, setContentWidth, props.isOpen]);

  const headerContent = (
    <div id='auth-header-container' className={isSignUp ? 'small-title-text' : 'sub-title-text'}>
      {isSignUp ? 'Create An Account' : 'Sign In'}
    </div>
  );

  const getClassNames = (): string => {
    const classNames = contentWidth === MAX_CONTENT_WIDTH ? 'max-content-width' : '';
    return `${classNames} ${pathname.split('/')[1]}`;
  }

  return (
    <div id='auth-modal'>
      <GigModal
        bodyContent={<Body />}
        classNames={getClassNames()}
        contentRef={contentRef}
        headerContent={headerContent}
        footerContent={<Footer setIsOpen={props.setIsOpen} />}
        id='auth-modal'
        isOpen={props.isOpen}
      />
    </div>
  );
}

export default AuthModal;
