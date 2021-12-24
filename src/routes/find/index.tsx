import { ReactElement, useState } from 'react';

import GigLoader from 'components/gig_loader';
import { SearchProvider } from 'providers/search';
import Header from 'routes/components/header';
import { useAuth } from 'providers/auth';
import { FavoritesProvider } from 'providers/favorites';
import AuthModal from 'routes/components/auth_modal';
import CenterPanel from 'routes/find/center_panel';
import UploadModal from 'routes/find/components/upload_modal';
import RightPanel from 'routes/find/right_panel';

const FindPage = (): ReactElement => {
  // provider variables and functions
  const { isLoggingIn } = useAuth();
  // local state variables and functions
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  if (isLoggingIn) {
    return (
      <div id='authenticating-page'>
        <GigLoader color='#5BA1C5' type='cylon'/>
        <div className='thick header-text text-center' id='auth-text'>Authenticating...</div>
      </div>
    );
  };

  return (
    <SearchProvider>
      <FavoritesProvider>
        <AuthModal isOpen={isAuthModalOpen} setIsOpen={setIsAuthModalOpen} />
        <UploadModal isOpen={isUploadModalOpen} setIsOpen={setIsUploadModalOpen} />
        <div className='page-container' id='find-page'>
          <Header
            setIsAuthModalOpen={setIsAuthModalOpen}
            setIsUploadModalOpen={setIsUploadModalOpen}
          />
          <CenterPanel />
          <RightPanel
            setIsAuthModalOpen={setIsAuthModalOpen}
            setIsUploadModalOpen={setIsUploadModalOpen}
          />
        </div>
      </FavoritesProvider>
    </SearchProvider>
  );
};

export default FindPage;
