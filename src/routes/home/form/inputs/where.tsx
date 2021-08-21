import { ReactElement } from 'react';

import GigTextInput from 'components/gig_input/text/text';
import { useSearchForm } from 'providers/search_form';

const WhereInput = (): ReactElement => {
  const { where, onKeyPress, updateInput } = useSearchForm();

  return (
    <div className='input-wrapper'>
      <GigTextInput
        classNames='search-form-input'
        formValue={where}
        id='search-form-where-input'
        onKeyPress={onKeyPress}
        placeholder='city and state'
        setFormValue={(value: string) => updateInput('where', value)}
      />
    </div>
  )
}

export default WhereInput;
