import './index.scss';

import { ReactElement } from 'react';
import { FaTimes } from 'react-icons/fa';

import GigButton from 'components/gig_button';
import GigTextInput from 'components/gig_input/text';
import { useFilter } from 'providers/filter';

type FilterPanelProps = {
  id: string,
}

const FilterPanel = (props: FilterPanelProps): ReactElement => {
  const { filters, deleteFilter, onKeyPress } = useFilter();

  const populateFilters = (filters: Array<string>): Array<ReactElement> => {
    return filters.map((filter, index) => {
      return (
        <GigButton
          classNames='filter-button'
          id={`${filter}-filter-button`}
          key={`${filter}-filter-button`}
          onClick={() => deleteFilter(filter)}
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
      <GigTextInput
        classNames='off-white-text-input'
        clearKey='Enter'
        id='filter-panel-text-input'
        onKeyPress={onKeyPress}
        placeholder='Add keyword filters to narrow your search...'
      />
      {
        !!filters.length &&
        <div id='search-filters'>
          {populateFilters(filters)}
        </div>
      }
    </div>
  );
}

export default FilterPanel;
