import './index.scss';

import { ReactElement } from 'react';
import { FaTimes } from 'react-icons/fa';

import GigButton from 'components/gig_button';
import SearchableGigInput from 'components/gig_input/searchable';
import { useSearch } from 'providers/search';

type FilterPanelProps = {
  id: string,
}

const FilterPanel = (props: FilterPanelProps): ReactElement => {
  const { filterOptions, searchFilters, deleteSearchFilter, onFilterSelect } = useSearch();

  const populateFilters = (filters: string[]): ReactElement[] => {
    return filters.map((filter, index) => {
      return (
        <GigButton
          classNames='filter-button'
          id={`${filter}-filter-button`}
          key={`${filter}-filter-button`}
          onClick={() => deleteSearchFilter(filter)}
          textBlock={
            <div className='filter-item' key={`${filter.replace(' ', '-')}-${index}`}>
              {filter}&nbsp;&nbsp;
              <FaTimes />
            </div>
          }
        />
      )
    });
  }

  return (
    <div id={props.id}>
      {
        filterOptions &&
        <SearchableGigInput
          classNames='off-white-text-input'
          clearKey='Enter'
          id='filter-panel-text-input'
          onOptionSelect={onFilterSelect}
          options={filterOptions}
          placeholder='Filter gigs by benefits...'
          selectedOptions={searchFilters}
        />
      }
      {
        !!searchFilters.length &&
        <div id='search-filters'>
          {populateFilters(searchFilters)}
        </div>
      }
    </div>
  );
}

export default FilterPanel;
