import './index.scss';

import { ReactElement } from 'react';
import { FaTimes } from 'react-icons/fa';

import GigButton from 'components/gig_button';
import UncontrolledSearchableGigInputProps from 'components/gig_input/searchable/uncontrolled';
import { useApp } from 'providers/app';
import { useSearch } from 'providers/search';
import { FilterAction } from 'types';

type FilterPanelProps = {
  id: string,
}

const FilterPanel = (props: FilterPanelProps): ReactElement => {
  const { calculateTotalHeight } = useApp();
  const { filterOptions, searchFilters, onFilterAction } = useSearch();

  const handleFilterSelect = (filter: string): void => {
    onFilterAction(FilterAction.add, filter);
    calculateTotalHeight();
  }

  const handleDeleteFilter = (filter: string): void => {
    onFilterAction(FilterAction.remove, filter);
    calculateTotalHeight();
  }

  const populateFilters = (filters: string[]): ReactElement[] => {
    return filters.map((filter, index) => {
      return (
        <GigButton
          classNames='filter-button'
          id={`${filter}-filter-button`}
          key={`${filter}-filter-button`}
          onClick={() => handleDeleteFilter(filter)}
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
        <UncontrolledSearchableGigInputProps
          classNames='off-white'
          clearKey='Enter'
          id='filter-panel-text-input'
          onOptionSelect={handleFilterSelect}
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
