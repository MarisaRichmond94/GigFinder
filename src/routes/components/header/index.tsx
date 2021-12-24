import './index.scss';

import { ReactElement, useCallback } from 'react';
import { isMobile } from 'react-device-detect';
import { useHistory, useLocation } from 'react-router-dom';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { GrLogin, GrLogout, GrCloudUpload } from 'react-icons/gr';

import logo from 'assets/icons/logo.png';
import GigButton from 'components/gig_button';
import { useViewport } from 'hooks/useViewport';
import { useAuth } from 'providers/auth';
import { useAuthForm } from 'providers/auth_form';
import settings from 'settings';

type HeaderProps = {
  setIsAuthModalOpen?: (isAuthModalOpen: boolean) => void,
  setIsUploadModalOpen?: (isUploadModalOpen: boolean) => void,
};

const Header = (props: HeaderProps): ReactElement => {
  // hook variables
  const history = useHistory();
  const { pathname } = useLocation();
  const { width } = useViewport();
  // provider variables and functions
  const { employer, isLoggedIn, user, logout } = useAuth();
  const { setIsSignUp } = useAuthForm();
  // destructured props
  const setIsAuthModalOpen = props?.setIsAuthModalOpen;
  const setIsUploadModalOpen = props?.setIsUploadModalOpen;

  const generateHeaderMessage = useCallback((): string => {
    switch (pathname) {
      case settings.CREATE_ROUTE:
        return employer.name;
      case settings.FIND_ROUTE:
      default:
        return `Welcome back, ${user.name}!`;
    }
  }, [employer?.name, pathname, user?.name]);

  const handleLogin = useCallback((): void => {
    setIsAuthModalOpen(true);
    setIsSignUp(false);
  }, [setIsAuthModalOpen, setIsSignUp]);

  const handleSignUp = useCallback((): void => {
    setIsAuthModalOpen(true);
    setIsSignUp(true);
  }, [setIsAuthModalOpen, setIsSignUp]);

  return (
    <div id='header'>
      <div id='header-title' onClick={() => history.push('/')}>
        <img alt='logo' id='header-title-icon' src={logo} />
        <div className='bold title-text' id='header-title-text'>Gig Search</div>
      </div>
      <div className='sub-header-text' id='header-message'>
        {
          isLoggedIn && user?.name &&
          <div id='greeting' title={generateHeaderMessage()}>
            {generateHeaderMessage()}
          </div>
        }
        {
          !isLoggedIn && width < settings.MIN_DESKTOP_WIDTH &&
          <GigButton
            classNames='off-black header icon-button large-header-text'
            id='sign-up-button'
            onClick={handleSignUp}
            textBlock={<BsFillPersonPlusFill />}
          />
        }
        {
          isLoggedIn && !isMobile && width < settings.MIN_DESKTOP_WIDTH &&
          pathname === settings.FIND_ROUTE &&
          <GigButton
            classNames='grey header icon-button large-header-text'
            id='upload-resume-icon-button'
            onClick={() => setIsUploadModalOpen(true)}
            textBlock={<GrCloudUpload />}
          />
        }
        <GigButton
          classNames='grey header icon-button large-header-text'
          id='auth-button'
          onClick={isLoggedIn ? logout : handleLogin}
          textBlock={isLoggedIn ? <GrLogout /> : <GrLogin />}
        />
      </div>
    </div>
  );
};

export default Header;
