import './index.scss';

import { ReactElement, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useViewport } from 'hooks/useViewport';
import useQuery from 'hooks/useQuery';
import { useSearch } from 'providers/search';
import SearchTextInput from 'routes/components/search/input/text';
import SearchDropdownInput from 'routes/components/search/input/dropdown';
import settings from 'settings';
import { DropdownOption } from 'types';

const SearchPanel = (): ReactElement => {
  const {
    debounceUpdateSearch,
    locationOptions,
    searchFilters,
    titleOptions,
    typeOptions,
  } = useSearch();
  const { pathname, search } = useLocation();
  const query = useQuery(search);
  const { width } = useViewport();

  const [title, setTitle] = useState(query.get('title') || '');
  const [location, setLocation] = useState(query.get('location') || '');
  const [type, setType] = useState<undefined | string>(query.get('type') || '');

  useEffect(() => {
    debounceUpdateSearch({
      title,
      location,
      type,
      filters: searchFilters ? searchFilters.join(',') : '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, location, type])

  const updateSearchText = (key: string, value: string): void => {
    switch (key) {
      case 'title':
        setTitle(value);
        break;
      case 'location':
      default:
        setLocation(value);
        break;
    }
  }

  const updateSelectedOption = (option: DropdownOption): void => {
    setType(typeOptions?.find(x => x === option.displayName) || undefined);
  }

  const getClassNames = (): string => {
    const pageType = width >= settings.MIN_DESKTOP_WIDTH ? 'desktop': 'mobile';
    const route = pathname === settings.FIND_ROUTE ? 'find' : 'home';
    return `${pageType} search-panel-item search-panel-input ${route}`;
  }

  return (
    <div id={`${pathname === settings.FIND_ROUTE ? 'find-' : 'home-'}search-panel`}>
      <div className={getClassNames()}>
        <SearchTextInput
          fieldName='title'
          id='search-text-title-input'
          options={titleOptions}
          placeholder='tech job title (e.g. "Software Engineer")'
          updateSearchText={updateSearchText}
          value={title}
        />
      </div>
      <div className={getClassNames()}>
        <SearchTextInput
          fieldName='location'
          id='search-text-location-input'
          options={locationOptions}
          placeholder='city in California (e.g. "Los Angeles")'
          updateSearchText={updateSearchText}
          value={location}
        />
      </div>
      <div className={getClassNames()}>
        <SearchDropdownInput
          fieldName='type'
          options={typeOptions?.map(typeOption => { return { displayName: typeOption }; }) || []}
          placeholder='full-time, part-time, etc.'
          selectedOption={type ? { displayName: type } : undefined}
          updateInput={updateSelectedOption}
        />
      </div>
    </div>
  );
}

export default SearchPanel;
