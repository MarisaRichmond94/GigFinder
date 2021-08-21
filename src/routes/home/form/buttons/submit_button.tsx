import { ReactElement } from 'react';

import { useSearchForm } from 'providers/search_form';

const SubmitButton = (): ReactElement => {
  const { onFormSubmit } = useSearchForm();

  return (
    <button className='primary-blue-gig-button paragraph-text' onClick={onFormSubmit}>
      Find My Dream Gig
    </button>
  )
}

export default SubmitButton;
