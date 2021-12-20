import './index.scss';

import { ReactElement } from 'react';

import { useViewport } from 'hooks/useViewport';
import { useSearch } from 'providers/search';

const SubmitButton = (): ReactElement => {
  const { onSearchFormSubmit } = useSearch();
  const { width } = useViewport();

  return (
    <div className='search-form-item' id='search-form-submit'>
      <button
        className={`primary-blue dark-background ${width > 749 ? '' : 'sub-'}header-text`}
        onClick={onSearchFormSubmit}
      >
        Find My Dream Gig
      </button>
    </div>
  )
}

export default SubmitButton;
