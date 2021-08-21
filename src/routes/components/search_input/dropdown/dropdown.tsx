import { ReactElement } from 'react';

import GigDropdown from 'components/gig_input/dropdown/dropdown';
import { Option, SearchDropdownInputProps } from './dropdown_types';

const SearchDropdownInput = (props: SearchDropdownInputProps): ReactElement => {
  return (
    <GigDropdown
      classNames={props.value?.displayName ? '' : 'placeholder-text'}
      id='search-form-when-input'
      onOptionSelect={(option: Option): void => props.updateInput(props.fieldName, option)}
      options={props.options}
      selectedOption={props.value}
      title={props.title}
    />
  )
}

export default SearchDropdownInput;
