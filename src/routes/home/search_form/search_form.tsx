import './search_form.scss';

import { ReactElement } from 'react';

import { useSearchForm } from 'providers/search_form';
import SearchTextInput from 'routes/components/search_input/text/text';
import SearchDropdownInput from 'routes/components/search_input/dropdown/dropdown';
import settings from 'settings';

const SearchForm = (): ReactElement => {
  const { what, where, when, onKeyPress, updateInput } = useSearchForm();

  return (
    <>
      <div className='search-form-item search-form-input' id='search-form-what-input'>
        <SearchTextInput
          fieldName='what'
          value={what}
          onKeyPress={onKeyPress}
          updateInput={updateInput}
        />
      </div>
      <div className='search-form-item search-form-input' id='search-form-where-input'>
        <SearchTextInput
          fieldName='where'
          value={where}
          onKeyPress={onKeyPress}
          updateInput={updateInput}
        />
      </div>
      <div className='search-form-item search-form-input' id='search-form-when-input'>
        <SearchDropdownInput
          fieldName='when'
          options={settings.whenOptions}
          title='full-time, part-time, etc.'
          value={when}
          updateInput={updateInput}
        />
      </div>
    </>
  )
}

export default SearchForm;
