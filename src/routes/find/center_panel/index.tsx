import './index.scss'

import { ReactElement } from 'react';
import { FaFilter } from 'react-icons/fa';
import { GoSearch } from 'react-icons/go';

import CollapsableSection from 'components/collapsable_section';
import FilterPanelWrapper from 'routes/components/filter_panel/wrapper';
import SearchPanelWrapper from 'routes/components/search/panel/wrapper';
import SearchResults from 'routes/components/search/results';

const CenterPanel = (): ReactElement => {
  return (
    <div id='center-panel'>
      <CollapsableSection icon={<GoSearch />} sectionTitle='Search'>
        <SearchPanelWrapper />
      </CollapsableSection>
      <CollapsableSection icon={<FaFilter />} sectionTitle='Filter'>
        <FilterPanelWrapper id='center-panel-filters' />
      </CollapsableSection>
      <SearchResults />
    </div>
  );
}

export default CenterPanel;
