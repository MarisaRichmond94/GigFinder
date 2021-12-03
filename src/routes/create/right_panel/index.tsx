import './index.scss';

import { ReactElement } from 'react';

import GigButton from 'components/gig_button';
import { useAuth } from 'providers/auth';

const RightPanel = (): ReactElement => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <div id='right-panel'>
      {
        isLoggedIn &&
        <GigButton
          classNames='secondary-blue dark-background sub-header-text'
          id='employer-sign-out-button'
          onClick={logout}
          text='Sign Out'
        />
      }
    </div>
  );
}

export default RightPanel;
