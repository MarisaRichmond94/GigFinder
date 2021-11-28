import './index.scss';

import { ReactElement, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useHistory, useLocation } from 'react-router-dom';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { GrLogin, GrLogout, GrCloudUpload } from 'react-icons/gr';

import logo from 'assets/icons/logo.png';
import GigButton from 'components/gig_button';
import { useAuth } from 'providers/auth';
import { useAuthForm } from 'providers/auth_form';
import { useUser } from 'providers/user';
import AuthModal from 'routes/components/auth_modal';
import UploadModal from 'routes/components/upload_modal';
import settings from 'settings';

const Header = (): ReactElement => {
  // hook variables
  const history = useHistory();
  const { pathname } = useLocation();
  // context variables and functions
  const { employer, isLoggedIn, user, logout } = useAuth();
  const userId = user?.id;
  const { setIsSignUp } = useAuthForm();
  const { getFavoriteGigs, getGigApplications, getUserResumes } = useUser();
  // local state variables and functions
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  useEffect(() => {
    if (userId) {
      getFavoriteGigs(userId);
      getUserResumes(userId);
      getGigApplications(userId);
    }
  }, [getFavoriteGigs, getUserResumes, userId]);

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
      <AuthModal isOpen={isAuthModalOpen} setIsOpen={setIsAuthModalOpen} />
      <UploadModal isOpen={isUploadModalOpen} setIsOpen={setIsUploadModalOpen} />
      <div id='header-title' onClick={() => history.push('/')}>
        <img alt='logo' id='header-title-icon' src={logo} />
        <div className='bold title-text' id='header-title-text'>Gig Search</div>
      </div>
      <div className='sub-header-text' id='header-message'>
        {
          isLoggedIn
            ? (
              <div id='greeting' title={generateHeaderMessage()}>
                {generateHeaderMessage()}
              </div>
            )
            : (
              <GigButton
                classNames='grey header icon-button large-header-text'
                id='sign-up-button'
                onClick={handleSignUpUser}
                textBlock={<BsFillPersonPlusFill />}
              />
            )
        }
        {
          isLoggedIn && !isMobile &&
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
          onClick={isLoggedIn ? logout : handleLoginUser}
          textBlock={isLoggedIn ? <GrLogout /> : <GrLogin />}
        />
      </div>
    </div>
  );
}

export default Header;
