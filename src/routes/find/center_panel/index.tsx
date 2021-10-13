import './index.scss'

import { ReactElement } from 'react';
import { GoSearch } from 'react-icons/go';

import CollapsableSection from 'components/collapsable_section';
import SearchPanelWrapper from 'routes/components/search/panel/wrapper';
import SearchResults from 'routes/components/search/results';

const CenterPanel = (): ReactElement => {
  return (
    <div id='center-panel'>
      <CollapsableSection icon={<GoSearch />} sectionTitle='Search'>
        <SearchPanelWrapper />
      </CollapsableSection>
      <SearchResults />
    </div>
  );
}

export default CenterPanel;
