import './index.scss'

import { ReactElement } from 'react';
import { FaFilter } from 'react-icons/fa';
import { GoSearch } from 'react-icons/go';

import CollapsableSection from 'components/collapsable_section';
import FilterPanel from 'routes/components/filter_panel';
import SearchPanel from 'routes/components/search/panel';
import SearchResults from 'routes/components/search/results';

const CenterPanel = (): ReactElement => {
  return (
    <div id='center-panel'>
      <CollapsableSection icon={<GoSearch />} sectionTitle='Search'>
        <SearchPanel />
      </CollapsableSection>
      <CollapsableSection icon={<FaFilter />} sectionTitle='Filter'>
        <FilterPanel id='center-panel-filters' />
      </CollapsableSection>
      <SearchResults />
    </div>
  );
}

export default CenterPanel;
