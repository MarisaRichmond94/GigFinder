import { ReactElement, useState } from 'react';

import { SearchProvider } from 'providers/search';
import Header from 'routes/components/header';
import { FavoritesProvider } from 'providers/favorites';
import AuthModal from 'routes/components/auth_modal';
import CenterPanel from 'routes/find/center_panel';
import UploadModal from 'routes/find/components/upload_modal';
import RightPanel from 'routes/find/right_panel';

const FindPage = (): ReactElement => {
  // local state variables and functions
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

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
}

export default FindPage;
