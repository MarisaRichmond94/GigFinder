import { ReactElement } from 'react';

import { FilterProvider } from 'providers/filter';
import FilterPanel from './index';

type FilterPanelWrapperProps = {
  id: string,
}

const FilterPanelWrapper = (props: FilterPanelWrapperProps ): ReactElement => {
  return (
    <FilterProvider>
      <FilterPanel id={props.id} />
    </FilterProvider>
  );
}

export default FilterPanelWrapper;
