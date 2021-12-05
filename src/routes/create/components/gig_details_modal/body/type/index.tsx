import './index.scss';

import { ReactElement } from 'react';

import GigDropdown from 'components/gig_input/dropdown';
import { useGigForm } from 'providers/gig_form';
import { GigFormFieldType, GigType } from 'types';

type TypeInputProps = {
  gigId: string,
}

const TypeInput = (props: TypeInputProps): ReactElement => {
  const { gigTypes, type, updateInput } = useGigForm();

  return (
    <div className='detail-row-flex-container'>
      <div id='job-type-details' className='bold sub-header-text'>Job Type</div>
      <GigDropdown
        classNames='sub-header-text gig-details-input off-white-gig-dropdown gig-type-dropdown'
        id={`gig-type-${props.gigId}`}
        onOptionSelect={
          (selectedGigType: GigType) => updateInput(GigFormFieldType.type, selectedGigType)
        }
        options={gigTypes}
        placeholder='full-time, part-time, etc.'
        selectedOption={type}
      />
    </div>
  );
};

export default TypeInput;
