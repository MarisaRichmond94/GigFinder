import './index.scss';

import { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';

import { useSearch } from 'providers/search';
import { useViewport } from 'hooks/useViewport';
import SearchTextInput from 'routes/components/search/input/text';
import SearchDropdownInput from 'routes/components/search/input/dropdown';
import settings from 'settings';

const SearchPanel = (): ReactElement => {
  const { pathname } = useLocation();
  const { location, title, type, onKeyPress, updateInput } = useSearch();
  const { width } = useViewport();

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
          placeholder='job title, keyword, or company'
          value={title}
          onKeyPress={onKeyPress}
          updateInput={updateInput}
        />
      </div>
      <div className={getClassNames()}>
        <SearchTextInput
          fieldName='location'
          id='search-text-location-input'
          placeholder='city and state'
          value={location}
          onKeyPress={onKeyPress}
          updateInput={updateInput}
        />
      </div>
      <div className={getClassNames()}>
        <SearchDropdownInput
          fieldName='type'
          options={settings.TYPE_OPTIONS}
          placeholder='full-time, part-time, etc.'
          value={type}
          updateInput={updateInput}
        />
      </div>
    </div>
  );
}

export default SearchPanel;
