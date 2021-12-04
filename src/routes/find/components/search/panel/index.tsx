import './index.scss';

import { ReactElement, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useViewport } from 'hooks/useViewport';
import useQuery from 'hooks/useQuery';
import { useSearch } from 'providers/search';
import SearchTextInput from 'routes/find/components/search/input/text';
import SearchDropdownInput from 'routes/find/components/search/input/dropdown';
import settings from 'settings';
import { Option } from 'types';

const SearchPanel = (): ReactElement => {
  const { debounceUpdateSearch, gigTypes, searchFilters } = useSearch();
  const { pathname, search } = useLocation();
  const query = useQuery(search);
  const { width } = useViewport();

  const [title, setTitle] = useState(query.get('title') || '');
  const [location, setLocation] = useState(query.get('location') || '');
  const [type, setType] = useState<undefined | Option>(
    gigTypes?.find(x => x.displayName === query.get('type')) || undefined
  );

  useEffect(() => {
    debounceUpdateSearch({
      title: title,
      location: location,
      type: type?.displayName || '',
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

  const updateSelectedOption = (option: Option): void => {
    setType(gigTypes?.find(x => x.displayName === option.displayName) || undefined);
  }

  const getClassNames = (): string => {
    const pageType = width >= settings.MIN_DESKTOP_WIDTH ? 'desktop': 'mobile';
    return `${pageType} search-panel-item search-panel-input ${pathname.replace('/', '')}`
  }

  return (
    <div id={`${pathname.replace('/', '')}${pathname !== '/' ? '-' : ''}search-panel`}>
      <div className={getClassNames()}>
        <SearchTextInput
          fieldName='title'
          id='search-text-title-input'
          placeholder='tech job title (e.g. "Software Engineer")'
          updateSearchText={updateSearchText}
          value={title}
        />
      </div>
      <div className={getClassNames()}>
        <SearchTextInput
          fieldName='location'
          id='search-text-location-input'
          placeholder='city in California (e.g. "Los Angeles")'
          updateSearchText={updateSearchText}
          value={location}
        />
      </div>
      <div className={getClassNames()}>
        <SearchDropdownInput
          fieldName='type'
          options={gigTypes}
          placeholder='full-time, part-time, etc.'
          selectedOption={type}
          updateInput={updateSelectedOption}
        />
      </div>
    </div>
  );
}

export default SearchPanel;
