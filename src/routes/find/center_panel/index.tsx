import './index.scss'

import { ReactElement, useEffect, useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import { GoSearch } from 'react-icons/go';

import CollapsableSection from 'components/collapsable_section';
import { useViewport } from 'hooks/useViewport';
import FavoriteGigsPanel from 'routes/components/favorite_gigs_panel';
import FilterPanel from 'routes/components/filter_panel';
import MobilePanelSelector from 'routes/find/center_panel/mobile_panel_selector';
import SearchPanel from 'routes/components/search/panel';
import SearchResults from 'routes/components/search/results';

const CenterPanel = (): ReactElement => {
  const [isShowingSearchResults, setIsShowingSearchResults] = useState(true);
  const { width } = useViewport();

  useEffect(() => {
    if (!isShowingSearchResults && width >= 850) {
      setIsShowingSearchResults(true);
    }
  }, [isShowingSearchResults, width]);

  return (
    <div id='center-panel'>
      <CollapsableSection icon={<GoSearch />} sectionTitle='Search'>
        <SearchPanel />
      </CollapsableSection>
      <CollapsableSection icon={<FaFilter />} sectionTitle='Filter'>
        <FilterPanel id='center-panel-filters' />
      </CollapsableSection>
      <MobilePanelSelector
        isShowingSearchResults={isShowingSearchResults}
        setIsShowingSearchResults={setIsShowingSearchResults}
      />
      {isShowingSearchResults ? <SearchResults /> : <FavoriteGigsPanel />}
    </div>
  );
}

export default CenterPanel;
