import { ReactElement } from 'react';

import GigTextInput from 'components/gig_input/text/text';
import { SearchTextInputProps } from './text_types';

const SearchTextInput = (props: SearchTextInputProps): ReactElement => {
  return (
    <GigTextInput
      classNames='search-form-input'
      formValue={props.value}
      id='search-form-what-input'
      onKeyPress={props.onKeyPress}
      placeholder='job title, keyword, or company'
      setFormValue={(value: string) => props.updateInput(props.fieldName, value)}
    />
  )
}

export default SearchTextInput;
