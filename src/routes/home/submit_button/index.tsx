import './index.scss';

import { ReactElement } from 'react';

import { useSearchForm } from 'providers/search_form';

const SubmitButton = (): ReactElement => {
  const { onFormSubmit } = useSearchForm();

  return (
    <div className='search-form-item' id='search-form-submit'>
      <button className='primary-blue-gig-button header-text' onClick={onFormSubmit}>
        Find My Dream Gig
      </button>
    </div>
  )
}

export default SubmitButton;
