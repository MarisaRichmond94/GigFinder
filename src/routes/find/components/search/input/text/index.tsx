import { ReactElement } from 'react';

import GigTextInput from 'components/gig_input/text';

type SearchTextInputProps = {
  fieldName: string,
  id: string,
  placeholder: string,
  updateSearchText: (key: string, value: string) => void,
  value: string,
}

const SearchTextInput = (props: SearchTextInputProps): ReactElement => {
  return (
    <GigTextInput
      classNames='search-form-input'
      formValue={props.value}
      id={props.id}
      placeholder={props.placeholder}
      setFormValue={(value: string) => props.updateSearchText(props.fieldName, value)}
    />
  )
}

export default SearchTextInput;
