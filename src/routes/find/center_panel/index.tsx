import './index.scss'

import { ReactElement, useEffect, useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import { GoSearch } from 'react-icons/go';

import CollapsableSection from 'components/collapsable_section';
import { useViewport } from 'hooks/useViewport';
import { useApp } from 'providers/app';
import UserApplicationsPanel from 'routes/components/applications/panel';
import FavoriteGigsPanel from 'routes/components/favorites/panel';
import FilterPanel from 'routes/components/filter_panel';
import PanelSelector from 'routes/components/panel_selector';
import SearchPanel from 'routes/components/search/panel';
import SearchResults from 'routes/components/search/results';
import { PanelTypes } from 'types';

const CenterPanel = (): ReactElement => {
  // context variables and functions
  const { unusableCenterPanelHeight, calculateTotalHeight } = useApp();
  // local state variables and functions
  const [activePanel, setActivePanel] = useState<PanelTypes>(PanelTypes.results);
  // hook variables
  const { width } = useViewport();

  useEffect(() => {
    if (activePanel !== PanelTypes.results && width >= 850) {
      setActivePanel(PanelTypes.results);
    }
  }, [setActivePanel, width]);

  const getActivePanel = (): ReactElement => {
    switch (activePanel) {
      case PanelTypes.applications:
        return <UserApplicationsPanel unusableHeight={unusableCenterPanelHeight} />;
      case PanelTypes.favorites:
        return <FavoriteGigsPanel unusableHeight={unusableCenterPanelHeight} />;
      case PanelTypes.results:
      default:
        return <SearchResults unusableHeight={unusableCenterPanelHeight} />;
    }
  }

  return (
    <div id='center-panel'>
      <CollapsableSection
        icon={<GoSearch />}
        id='search-panel-section'
        onToggleCallback={calculateTotalHeight}
        sectionTitle='Search'
      >
        <SearchPanel />
      </CollapsableSection>
      <CollapsableSection
        icon={<FaFilter />}
        id='filter-panel-section'
        onToggleCallback={calculateTotalHeight}
        sectionTitle='Filter'
      >
        <FilterPanel id='center-panel-filters' />
      </CollapsableSection>
      <PanelSelector
        activePanel={activePanel}
        id='center-panel-selector'
        panels={Object.keys(PanelTypes)}
        setActivePanel={setActivePanel}
      />
      {getActivePanel()}
    </div>
  );
}

export default CenterPanel;
