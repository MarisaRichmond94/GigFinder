import { ReactElement } from 'react';

import GigTextInput from 'components/gig_input/text/text';
import { UseSearchForm } from 'providers/search_form';

const WhatInput = (): ReactElement => {
  const { what, onKeyPress, updateInput } = UseSearchForm();

  return (
    <GigTextInput
      classNames='search-form-input'
      formValue={what}
      id='search-form-what-input'
      onKeyPress={onKeyPress}
      placeholder='job title, keyword, or company'
      setFormValue={(value: string) => updateInput('what', value)}
    />
  )
}

export default WhatInput;
