import { ReactElement } from 'react';

import ControlledSearchableGigInput from 'components/gig_input/searchable/controlled';

type SearchTextInputProps = {
  fieldName: string,
  id: string,
  options: string[],
  placeholder: string,
  updateSearchText: (key: string, value: string) => void,
  value: string,
}

const SearchTextInput = (props: SearchTextInputProps): ReactElement => {
  return (
    <ControlledSearchableGigInput
      classNames='search-form-input'
      formValue={props.value}
      id={props.id}
      options={props.options}
      placeholder={props.placeholder}
      onChange={(value: string) => props.updateSearchText(props.fieldName, value)}
      onOptionSelect={(value: string) => props.updateSearchText(props.fieldName, value)}
    />
  )
}

export default SearchTextInput;
