import { ReactElement } from 'react';

import GigTextInput from 'components/gig_input/text';

import { SearchTextInputProps } from './types';

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
