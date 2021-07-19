import { ReactElement } from 'react';

import GigInput from 'components/gig_input/gig_input';
import { UseSearchForm } from 'providers/search_form';

const WhereInput = (): ReactElement => {
  const { where, updateInput } = UseSearchForm();

  return (
    <div className='input-wrapper'>
      <GigInput
        classNames='search-form-input'
        formValue={where}
        id='search-form-where-input'
        placeholder='city and state'
        setFormValue={(value: string) => updateInput('where', value)}
      />
    </div>
  )
}

export default WhereInput;
