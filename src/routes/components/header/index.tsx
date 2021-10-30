import './index.scss';

import { ReactElement } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { GrLogin, GrLogout } from 'react-icons/gr';

import logo from 'assets/icons/logo.png';
import GigButton from 'components/gig_button';
import { useAuth } from 'providers/auth';
import settings from 'settings';

const Header = (): ReactElement => {
  const history = useHistory();
  const { companyName, isLoggedIn, userName, logout, loginUser } = useAuth();
  const { pathname } = useLocation();

  const generateHeaderMessage = (): string => {
    switch (pathname) {
      case settings.CREATE_ROUTE:
        return companyName;
      case settings.SEARCH_ROUTE:
      default:
        return `Welcome back, ${userName}!`;
    }
  }

  const handleAuthButtonClick = () => {
    if (isLoggedIn) {
      logout();
    } else {
      // TODO - Have this trigger the account creation/sign in modal when that is created
      loginUser();
    }
  }

  return (
    <div id='header'>
      <div id='header-title' onClick={() => history.push('/')}>
        <img alt='logo' id='header-title-icon' src={logo} />
        <div className='title-text' id='header-title-text'>Gig Search</div>
      </div>
      <div className='sub-header-text' id='header-message'>
        {isLoggedIn && generateHeaderMessage()}
        <GigButton
          id='logout-icon-button'
          onClick={handleAuthButtonClick}
          textBlock={isLoggedIn ? <GrLogout /> : <GrLogin />}
        />
      </div>
    </div>
  );
}

export default Header;
