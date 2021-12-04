import './index.scss';

import { ReactElement, useState } from 'react';

import { useApp } from 'providers/app';
import { AuthFormProvider } from 'providers/auth_form';
import UserApplicationsPanel from 'routes/find/components/applications/panel';
import PanelSelector from 'routes/components/panel_selector';
import ActiveResume from 'routes/find/components/active_resume';
import FavoriteGigsPanel from 'routes/find/components/favorites/panel';
import ActionButtons from 'routes/find/right_panel/action_buttons';
import Filters from 'routes/find/right_panel/filters';
import { FindPanelTypes } from 'types';

const RightPanel = (): ReactElement => {
  // context variables and functions
  const { unusableRightPanelHeight } = useApp();
  // local state variables and functions
  const [activePanel, setActivePanel] = useState<FindPanelTypes>(FindPanelTypes.favorites);

  const getActivePanel = (): ReactElement => {
    switch (activePanel) {
      case FindPanelTypes.applications:
        return <UserApplicationsPanel unusableHeight={unusableRightPanelHeight} />;
      case FindPanelTypes.favorites:
        return <FavoriteGigsPanel unusableHeight={unusableRightPanelHeight} />;
    }
  }

  return (
    <div id='right-panel'>
      <AuthFormProvider>
        <ActionButtons />
      </AuthFormProvider>
      <ActiveResume />
      <Filters />
      <PanelSelector
        activePanel={activePanel}
        buttonClasses='underline-text off-white header-text'
        id='right-panel-selector'
        panels={Object.keys(FindPanelTypes).slice(1)}
        setActivePanel={setActivePanel}
      />
      {getActivePanel()}
    </div>
  );
}

export default RightPanel;
