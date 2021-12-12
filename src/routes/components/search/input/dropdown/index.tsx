import { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';

import GigDropdown from 'components/gig_input/dropdown';
import settings from 'settings';
import { DropdownOption } from 'types';

type SearchDropdownInputProps = {
  fieldName: string,
  options?: DropdownOption[],
  placeholder: string,
  selectedOption?: DropdownOption,
  updateInput: (value: DropdownOption) => void,
}

const SearchDropdownInput = (props: SearchDropdownInputProps): ReactElement => {
  const { pathname } = useLocation();

  const getClassNames = (): string => {
    let classNames = props.selectedOption?.displayName ? '' : 'placeholder-text';
    classNames += pathname === settings.FIND_ROUTE
      ? ' off-white-gig-dropdown'
      : ' white-gig-dropdown';
    return classNames;
  };

  return (
    <GigDropdown
      classNames={getClassNames()}
      id='search-form-type-input'
      onOptionSelect={(value: DropdownOption) => props.updateInput(value)}
      options={props.options}
      placeholder={props.placeholder}
      selectedOption={props.selectedOption}
    />
  )
}

export default SearchDropdownInput;
