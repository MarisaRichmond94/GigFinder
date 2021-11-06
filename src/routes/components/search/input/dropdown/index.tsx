import { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';

import GigDropdown from 'components/gig_input/dropdown';
import settings from 'settings';

import { Option, SearchDropdownInputProps } from './types';

const SearchDropdownInput = (props: SearchDropdownInputProps): ReactElement => {
  const { pathname } = useLocation();

  const getClassNames = (): string => {
    let classNames = props.value?.displayName ? '' : 'placeholder-text';
    classNames += pathname === settings.SEARCH_ROUTE
      ? 'off-white-gig-dropdown'
      : 'white-gig-dropdown';
    return classNames;
  };

  return (
    <GigDropdown
      classNames={getClassNames()}
      id='search-form-type-input'
      onOptionSelect={(option: Option): void => props.updateInput(props.fieldName, option)}
      options={props.options}
      placeholder={props.placeholder}
      selectedOption={props.value}
    />
  )
}

export default SearchDropdownInput;
