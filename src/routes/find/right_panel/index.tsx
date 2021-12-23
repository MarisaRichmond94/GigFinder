import './index.scss';

import { ReactElement, useState } from 'react';
import { FaFilter } from 'react-icons/fa';

import { useApp } from 'providers/app';
import UserApplicationsPanel from 'routes/find/components/applications/panel';
import PanelSelector from 'routes/components/panel_selector';
import ActiveResume from 'routes/find/components/active_resume';
import FavoriteGigsPanel from 'routes/find/components/favorites/panel';
import ActionButtons from 'routes/find/right_panel/action_buttons';
import { FindPanelTypes } from 'types';
import FilterPanel from 'routes/find/components/filter_panel';

type RightPanelProps = {
  setIsAuthModalOpen?: (isAuthModalOpen: boolean) => void,
  setIsUploadModalOpen: (isUploadModalOpen: boolean) => void,
};

const RightPanel = (props: RightPanelProps): ReactElement => {
  const { unusableRightPanelHeight } = useApp();
  const [activePanel, setActivePanel] = useState<FindPanelTypes>(FindPanelTypes.favorites);

  const getActivePanel = (): ReactElement => {
    switch (activePanel) {
      case FindPanelTypes.applications:
        return <UserApplicationsPanel unusableHeight={unusableRightPanelHeight} />;
      case FindPanelTypes.favorites:
        return <FavoriteGigsPanel unusableHeight={unusableRightPanelHeight} />;
    }
  };

  return (
    <div id='right-panel'>
      <ActionButtons
        setIsAuthModalOpen={props.setIsAuthModalOpen}
        setIsUploadModalOpen={props.setIsUploadModalOpen}
      />
      <ActiveResume isDisplayHeader />
      <div id='search-filters-section'>
        <div id='search-filters-header' className='thick header-text'>
          <FaFilter /> Filters
        </div>
        <FilterPanel id='right-panel-filters' />
      </div>
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
};

export default RightPanel;
