import './index.scss';

import { ReactElement } from 'react';

import GigDropdown from 'components/gig_input/dropdown';
import { useGigForm } from 'providers/gig_form';
import { DropdownOption, GigFormFieldType } from 'types';

type TypeInputProps = {
  gigId?: string,
};

const TypeInput = (props: TypeInputProps): ReactElement => {
  const { type, typeOptions, updateInput } = useGigForm();

  return (
    <div className='detail-row-container'>
      <div id='job-type-details' className='bold sub-header-text gig-detail-title'>
        Gig Type
      </div>
      <GigDropdown
        classNames='sub-header-text gig-details-input gig-type-dropdown'
        onOptionSelect={
          (selectedType: DropdownOption) => updateInput(
            GigFormFieldType.type, selectedType.displayName
          )
        }
        options={typeOptions?.map(typeOption => { return { displayName: typeOption }; }) || []}
        placeholder='full-time, part-time, etc.'
        selectedOption={type ? { displayName: type } : undefined}
      />
    </div>
  );
};

export default TypeInput;
