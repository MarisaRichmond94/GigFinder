import './index.scss'

import { ReactElement, useEffect, useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import { GoSearch } from 'react-icons/go';

import CollapsableSection from 'components/collapsable_section';
import { useViewport } from 'hooks/useViewport';
import { useApp } from 'providers/app';
import { useSearch } from 'providers/search';
import PanelSelector from 'routes/components/panel_selector';
import SearchPanel from 'routes/components/search/panel';
import SearchResults from 'routes/components/search/results';
import UserApplicationsPanel from 'routes/find/components/applications/panel';
import FavoriteGigsPanel from 'routes/find/components/favorites/panel';
import FilterPanel from 'routes/find/components/filter_panel';
import { FindPanelTypes } from 'types';

const CenterPanel = (): ReactElement => {
  // context variables and functions
  const { unusableCenterPanelHeight, calculateTotalHeight } = useApp();
  const { results } = useSearch();
  // local state variables and functions
  const [activePanel, setActivePanel] = useState<FindPanelTypes>(FindPanelTypes.results);
  // hook variables
  const { width } = useViewport();

  useEffect(() => {
    if (activePanel !== FindPanelTypes.results && width >= 850) {
      setActivePanel(FindPanelTypes.results);
    }
  }, [activePanel, setActivePanel, width]);

  const getActivePanel = (): ReactElement => {
    switch (activePanel) {
      case FindPanelTypes.applications:
        return <UserApplicationsPanel isCenterPanel unusableHeight={unusableCenterPanelHeight} />;
      case FindPanelTypes.favorites:
        return (
          <FavoriteGigsPanel
            isCenterPanel
            showActiveResumeSelector
            unusableHeight={unusableCenterPanelHeight + 96}
          />
        );
      case FindPanelTypes.results:
      default:
        return <SearchResults isCenterPanel unusableHeight={unusableCenterPanelHeight} />;
    }
  };

  return (
    <div id='find-center-panel'>
      <CollapsableSection
        icon={<GoSearch />}
        id='search-panel-section'
        isVisible={false}
        onToggleCallback={calculateTotalHeight}
        sectionTitle={results?.length ? `Search (${results.length})` : 'Search'}
      >
        <SearchPanel />
      </CollapsableSection>
      <CollapsableSection
        icon={<FaFilter />}
        id='filter-panel-section'
        isVisible={false}
        onToggleCallback={calculateTotalHeight}
        sectionTitle='Filter'
      >
        <FilterPanel id='center-panel-filters' />
      </CollapsableSection>
      <PanelSelector
        activePanel={activePanel}
        id='find-center-panel-selector'
        panels={Object.keys(FindPanelTypes)}
        setActivePanel={setActivePanel}
      />
      {getActivePanel()}
    </div>
  );
};

export default CenterPanel;
