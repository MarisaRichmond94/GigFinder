import './index.scss';

import { ReactElement } from 'react';
import { FaFilter } from 'react-icons/fa';

import FilterPanel from 'routes/components/filter_panel';

const Filters = (): ReactElement => {
  return (
    <div id='search-filters-section'>
      <div id='search-filters-header' className='thick header-text'>
        <FaFilter id='search-filters-header-icon' />&nbsp;
        Filters
      </div>
      <FilterPanel id='right-panel-filters' />
    </div>
  );
}

export default Filters;
