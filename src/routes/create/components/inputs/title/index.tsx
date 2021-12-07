import './index.scss';

import { ReactElement } from 'react';

import ControlledSearchableGigInput from 'components/gig_input/searchable/controlled';
import { useGigForm } from 'providers/gig_form';
import { GigFormFieldType } from 'types';

const TitleInput = (): ReactElement => {
  const { title, titleOptions, updateInput } = useGigForm();

  return (
    <div className='detail-row-flex-container'>
      <ControlledSearchableGigInput
        classNames='off-white-text-input gig-details-title-input'
        formValue={title || ''}
        id='gig-title-searchable-input'
        onChange={updatedTitle => updateInput(GigFormFieldType.title, updatedTitle)}
        onOptionSelect={updatedTitle => updateInput(GigFormFieldType.title, updatedTitle)}
        options={titleOptions}
        placeholder='Select gig title (e.g. "Software Engineer")'
      />
    </div>
  );
};

export default TitleInput;
