import './index.scss';

import { ReactElement } from 'react';

import { AuthFormProvider } from 'providers/auth_form';
import ActionButtons from 'routes/find/right_panel/action_buttons';
import ActiveResume from 'routes/components/active_resume';
import FavoriteGigsPanel from 'routes/components/favorite_gigs_panel';
import Filters from 'routes/find/right_panel/filters';

const RightPanel = (): ReactElement => {
  return (
    <div id='right-panel'>
      <AuthFormProvider>
        <ActionButtons />
      </AuthFormProvider>
      <ActiveResume />
      <Filters />
      <FavoriteGigsPanel />
    </div>
  );
}

export default RightPanel;
