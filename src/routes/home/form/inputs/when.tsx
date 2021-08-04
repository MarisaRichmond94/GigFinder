import { ReactElement } from 'react';

import GigDropdown from 'components/gig_dropdown/gig_dropdown';
import { UseSearchForm } from 'providers/search_form';

interface Option {
  displayName: string,
  icon?: ReactElement,
  onClick?: () => void,
}

const OPTIONS = [
  { displayName: 'Any' },
  { displayName: 'Part-Time' },
  { displayName: 'Full-Time' },
  { displayName: 'Contract' },
  { displayName: 'Internship' }
];

const WhenInput = (): ReactElement => {
  const { when, updateInput } = UseSearchForm();

  return (
    <GigDropdown
      classNames={when?.displayName ? '' : 'placeholder-text'}
      id='search-form-when-input'
      onOptionSelect={(option: Option): void => updateInput('when', option)}
      options={OPTIONS}
      selectedOption={when}
      title='full-time, part-time, etc.'
    />
  )
}

export default WhenInput;
