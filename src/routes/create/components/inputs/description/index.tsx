import { ReactElement } from 'react';

import GigTextAreaInput from 'components/gig_input/text_area';
import { useGigForm } from 'providers/gig_form';
import { GigFormFieldType } from 'types';

type DescriptionInputProps = {
  gigId?: string,
};

const DescriptionInput = (props: DescriptionInputProps): ReactElement => {
  const { description, updateInput } = useGigForm();

  return (
    <div className='detail-row-container'>
      <div className='bold sub-header-text gig-detail-title'>
        Description
      </div>
      <GigTextAreaInput
        classNames='gig-details-input gig-description-textarea'
        formValue={description}
        placeholder='Detailed description of the gig'
        setFormValue={
          updatedDescription => updateInput(GigFormFieldType.description, updatedDescription)
        }
      />
    </div>
  );
};

export default DescriptionInput;
