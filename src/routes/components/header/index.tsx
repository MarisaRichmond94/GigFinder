import './index.scss';

import { ReactElement, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { GrLogin, GrLogout } from 'react-icons/gr';

import logo from 'assets/icons/logo.png';
import GigButton from 'components/gig_button';
import { useAuth } from 'providers/auth';
import { useAuthForm } from 'providers/auth_form';
import AuthModal from 'routes/components/auth_modal';
import settings from 'settings';

const Header = (): ReactElement => {
  const history = useHistory();
  const { pathname } = useLocation();
  const { employer, isLoggedIn, user, logout } = useAuth();
  const { setIsSignUp } = useAuthForm();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const generateHeaderMessage = (): string => {
    switch (pathname) {
      case settings.CREATE_ROUTE:
        return employer.name;
      case settings.SEARCH_ROUTE:
      default:
        return `Welcome back, ${user.name}!`;
    }
  }

  const handleLoginUser = (): void => {
    setIsAuthModalOpen(true);
    setIsSignUp(false);
  }

  const handleSignUpUser = (): void => {
    setIsAuthModalOpen(true);
    setIsSignUp(true);
  }

  return (
    <div id='header'>
      <AuthModal
        isOpen={isAuthModalOpen}
        setIsOpen={setIsAuthModalOpen}
      />
      <div id='header-title' onClick={() => history.push('/')}>
        <img alt='logo' id='header-title-icon' src={logo} />
        <div className='title-text' id='header-title-text'>Gig Search</div>
      </div>
      <div className='sub-header-text' id='header-message'>
        {
          isLoggedIn
            ? generateHeaderMessage()
            : (
              <GigButton
                classNames='auth-icon-button'
                id='sign-up-button'
                onClick={handleSignUpUser}
                textBlock={<BsFillPersonPlusFill />}
              />
            )
        }
        <GigButton
          classNames='auth-icon-button'
          id='auth-button'
          onClick={isLoggedIn ? logout : handleLoginUser}
          textBlock={isLoggedIn ? <GrLogout /> : <GrLogin />}
        />
      </div>
    </div>
  );
}

export default Header;
