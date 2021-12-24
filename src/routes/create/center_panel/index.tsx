import './index.scss'

import { ReactElement, useCallback, useEffect, useState } from 'react';

import { useViewport } from 'hooks/useViewport';
import { ApplicationsProvider } from 'providers/applications';
import { MessageTemplatesProvider } from 'providers/message_templates';
import PanelSelector from 'routes/components/panel_selector';
import ApplicationsPanel from 'routes/create/components/applications_panel';
import GigCreationPanel from 'routes/create/components/gig_creation_panel';
import GigsPanel from 'routes/create/components/gigs_panel';
import MessageTemplatePanel from 'routes/create/components/message_template_panel';
import { CreatePanelTypes } from 'types';
import settings from 'settings';

const CenterPanel = (): ReactElement => {
  // local state variables and functions
  const [activePanel, setActivePanel] = useState<CreatePanelTypes>(CreatePanelTypes.gigs);
  // hook variables
  const { width } = useViewport();
  // derived variables
  const [gigs, candidates, post, templates] = Object.keys(CreatePanelTypes);
  const desktopPanels = [gigs, candidates];
  const mobileOnlyPanels = [post, templates];

  useEffect(() => {
    if (!desktopPanels.includes(activePanel) && width >= settings.MIN_DESKTOP_WIDTH) {
      setActivePanel(CreatePanelTypes.gigs);
    }
    // eslint-disable-next-line
  }, [activePanel, setActivePanel, width]);

  const getActivePanel = useCallback((): ReactElement => {
    switch (activePanel) {
      case CreatePanelTypes.templates:
        return <MessageTemplatePanel />;
      case CreatePanelTypes.post:
        return <GigCreationPanel />;
      case CreatePanelTypes.apps:
        return <ApplicationsPanel />;
      case CreatePanelTypes.gigs:
      default:
        return <GigsPanel />;
    };
  }, [activePanel]);

  return (
    <div id='create-center-panel'>
      <PanelSelector
        activePanel={activePanel}
        hiddenPanels={width >= settings.MIN_DESKTOP_WIDTH ? mobileOnlyPanels : []}
        id='create-center-panel-selector'
        panels={Object.keys(CreatePanelTypes)}
        setActivePanel={setActivePanel}
      />
        <MessageTemplatesProvider>
          <ApplicationsProvider>
            {getActivePanel()}
          </ApplicationsProvider>
        </MessageTemplatesProvider>
    </div>
  );
};

export default CenterPanel;
