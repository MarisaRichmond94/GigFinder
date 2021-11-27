import './index.scss';

import { ReactElement, useState } from 'react';

import { AuthFormProvider } from 'providers/auth_form';
import UserApplicationsPanel from 'routes/components/applications/panel';
import ActiveResume from 'routes/components/active_resume';
import FavoriteGigsPanel from 'routes/components/favorites/panel';
import PanelSelector from 'routes/components/panel_selector';
import ActionButtons from 'routes/find/right_panel/action_buttons';
import Filters from 'routes/find/right_panel/filters';
import { PanelTypes } from 'types';

const RightPanel = (): ReactElement => {
  const [activePanel, setActivePanel] = useState<PanelTypes>(PanelTypes.favorites);

  const getActivePanel = (): ReactElement => {
    switch (activePanel) {
      case PanelTypes.applications:
        return <UserApplicationsPanel />;
      case PanelTypes.favorites:
        return <FavoriteGigsPanel />;
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
        panels={Object.keys(PanelTypes).slice(1)}
        setActivePanel={setActivePanel}
      />
      {getActivePanel()}
    </div>
  );
}

export default RightPanel;
