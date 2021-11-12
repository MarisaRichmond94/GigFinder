import './index.scss';

import { ReactElement } from 'react';

import { useSearch } from 'providers/search';

const SubmitButton = (): ReactElement => {
  const { onSearchFormSubmit } = useSearch();

  return (
    <div className='search-form-item' id='search-form-submit'>
      <button className='primary-blue-gig-button header-text' onClick={onSearchFormSubmit}>
        Find My Dream Gig
      </button>
    </div>
  )
}

export default SubmitButton;
