import './index.scss';

import { ReactElement, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useViewport } from 'hooks/useViewport';
import useQuery from 'hooks/useQuery';
import { useSearch } from 'providers/search';
import SearchTextInput from 'routes/components/search/input/text';
import SearchDropdownInput from 'routes/components/search/input/dropdown';
import settings from 'settings';

import { Option } from './types';

const SearchPanel = (): ReactElement => {
  const { pathname, search } = useLocation();
  const query = useQuery(search);
  const { debounceUpdateSearch } = useSearch();
  const { width } = useViewport();

  const [title, setTitle] = useState(query.get('title') || '');
  const [location, setLocation] = useState(query.get('location') || '');
  const [type, setType] = useState<undefined | Option>(
    settings.TYPE_OPTIONS.find(x => x.displayName === query.get('type')) || undefined
  );

  const getClassNames = (): string => {
    const pageType = width >= settings.MIN_DESKTOP_WIDTH ? 'desktop': 'mobile';
    return `${pageType} search-panel-item search-panel-input ${pathname.replace('/', '')}`
  }

  const updateSelectedOption = (key: string, value: Option): void => {
    setType(settings.TYPE_OPTIONS.find(x => x.displayName === value.displayName) || undefined);
    debounceUpdateSearch(key, value.displayName || undefined);
  }

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
    debounceUpdateSearch(key, value);
  }

  return (
    <div id={`${pathname.replace('/', '')}${pathname !== '/' ? '-' : ''}search-panel`}>
      <div className={getClassNames()}>
        <SearchTextInput
          fieldName='title'
          id='search-text-title-input'
          placeholder='job title, keyword, or company'
          updateSearchText={updateSearchText}
          value={title}
        />
      </div>
      <div className={getClassNames()}>
        <SearchTextInput
          fieldName='location'
          id='search-text-location-input'
          placeholder='city and state'
          updateSearchText={updateSearchText}
          value={location}
        />
      </div>
      <div className={getClassNames()}>
        <SearchDropdownInput
          fieldName='type'
          options={settings.TYPE_OPTIONS}
          placeholder='full-time, part-time, etc.'
          selectedOption={type}
          updateInput={updateSelectedOption}
        />
      </div>
    </div>
  );
}

export default SearchPanel;
