import './index.scss';

import { ReactElement } from 'react';

import GigTextAreaInput from 'components/gig_input/text_area';
import { useGigForm } from 'providers/gig_form';
import { GigFormFieldType } from 'types';

type RequirementsInputProps = {
  gigId?: string,
}

const RequirementsInput = (props: RequirementsInputProps): ReactElement => {
  const { requirements, updateInput } = useGigForm();

  return (
    <div className='detail-row-container'>
      <div id='job-requirements-details' className='bold sub-header-text gig-detail-title'>
        Requirements
      </div>
      <GigTextAreaInput
        classNames='sub-header-text gig-details-input gig-requirements-textarea'
        formValue={requirements}
        id={`gig-requirements-${props.gigId ? `-${props.gigId}` : ''}`}
        placeholder='Period seperated list of gig requirements'
        setFormValue={
          updatedRequirements => updateInput(GigFormFieldType.requirements, updatedRequirements)
        }
        rowCount={2}
      />
    </div>
  );
};

export default RequirementsInput;
