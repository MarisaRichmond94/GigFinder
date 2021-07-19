import { ReactElement } from 'react';

import GigInput from 'components/gig_input/gig_input';
import { UseSearchForm } from 'providers/search_form';

const WhatInput = (): ReactElement => {
  const { what, updateInput } = UseSearchForm();

  return (
    <GigInput
      classNames='search-form-input'
      formValue={what}
      id='search-form-what-input'
      placeholder='job title, keyword, or company'
      setFormValue={(value: string) => updateInput('what', value)}
    />
  )
}

export default WhatInput;
