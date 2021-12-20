import { ReactElement, useEffect, useState } from 'react';

import { SearchProvider } from 'providers/search';
import Header from 'routes/components/header';
import { useAuth } from 'providers/auth';
import { useUser } from 'providers/user';
import AuthModal from 'routes/components/auth_modal';
import CenterPanel from 'routes/find/center_panel';
import UploadModal from 'routes/find/components/upload_modal';
import RightPanel from 'routes/find/right_panel';

const FindPage = (): ReactElement => {
  // context variables and functions
  const { user } = useAuth();
  const { getFavoriteGigs, getApplications, getResumes } = useUser();
  // derived variables
  const userId = user?.id;
  // local state variables and functions
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  useEffect(() => {
    if (userId) {
      getFavoriteGigs(userId);
      getResumes(userId);
      getApplications(userId);
    }
  }, [getFavoriteGigs, getApplications, getResumes, userId]);

  return (
    <SearchProvider>
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
    </SearchProvider>
  );
}

export default FindPage;
