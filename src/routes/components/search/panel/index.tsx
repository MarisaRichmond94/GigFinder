import './index.scss';

import { ReactElement, useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import GigDropdown from 'components/gig_input/dropdown';
import ControlledSearchableGigInput from 'components/gig_input/searchable/controlled';
import { useViewport } from 'hooks/useViewport';
import useQuery from 'hooks/useQuery';
import { useSearch } from 'providers/search';
import settings from 'settings';
import { DropdownOption } from 'types';

const SearchPanel = (): ReactElement => {
  const { locationOptions, searchFilters, titleOptions, typeOptions } = useSearch();
  const { debounceUpdateSearch } = useSearch();
  const { pathname, search } = useLocation();
  const query = useQuery(search);
  const { width } = useViewport();

  const [title, setTitle] = useState(query.get('title') || '');
  const [location, setLocation] = useState(query.get('location') || '');
  const [type, setType] = useState<undefined | string>(query.get('type') || '');

  useEffect(() => {
    if (typeOptions) {
      debounceUpdateSearch(
        {
          title,
          location,
          type,
          filters: searchFilters ? searchFilters.join(',') : '',
        },
        typeOptions,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, location, type, typeOptions]);

  const updateSearchText = useCallback((key: string, value: string): void => {
    switch (key) {
      case 'title':
        setTitle(value);
        break;
      case 'location':
      default:
        setLocation(value);
        break;
    };
  }, []);

  const updateSelectedOption = useCallback((option: DropdownOption): void => {
    setType(typeOptions?.find(x => x === option.displayName) || undefined);
  }, [typeOptions]);

  const getClassNames = useCallback((): string => {
    const pageType = width >= settings.MIN_DESKTOP_WIDTH ? 'desktop': 'mobile';
    const route = pathname === settings.FIND_ROUTE ? 'find' : 'home';
    return `${pageType} search-panel-item search-panel-input ${route}`;
  }, [pathname, width]);

  return (
    <div id={`${pathname === settings.FIND_ROUTE ? 'find-' : 'home-'}search-panel`}>
      <div className={getClassNames()}>
        <ControlledSearchableGigInput
          classNames={pathname === settings.FIND_ROUTE ? 'off-white' : 'white'}
          formValue={title}
          id='search-text-title-input'
          options={titleOptions}
          placeholder='tech job title (e.g. "Software Engineer")'
          onChange={(updatedTitle: string) => updateSearchText('title', updatedTitle)}
          onOptionSelect={(updatedTitle: string) => updateSearchText('title', updatedTitle)}
        />
      </div>
      <div className={getClassNames()}>
        <ControlledSearchableGigInput
          classNames={pathname === settings.FIND_ROUTE ? 'off-white' : 'white'}
          formValue={location}
          id='search-text-location-input'
          options={locationOptions}
          placeholder='city in California (e.g. "Los Angeles")'
          onChange={(updatedCity: string) => updateSearchText('location', updatedCity)}
          onOptionSelect={(updatedCity: string) => updateSearchText('location', updatedCity)}
        />
      </div>
      <div className={getClassNames()}>
        <GigDropdown
          classNames={pathname === settings.FIND_ROUTE ? 'off-white' : 'white'}
          id='search-form-type-input'
          onOptionSelect={(selectedType: DropdownOption) => updateSelectedOption(selectedType)}
          options={typeOptions?.map(typeOption => { return { displayName: typeOption }; }) || []}
          placeholder='full-time, part-time, etc.'
          selectedOption={type ? { displayName: type } : undefined}
        />
      </div>
    </div>
  );
};

export default SearchPanel;
