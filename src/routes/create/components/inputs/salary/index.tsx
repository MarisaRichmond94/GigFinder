import './index.scss';

import { ReactElement } from 'react';

import GigTextInput from 'components/gig_input/text';
import { useGigForm } from 'providers/gig_form';
import { GigFormFieldType } from 'types';

type SalaryInputProps = {
  gigId?: string,
};

const SalaryInput = (props: SalaryInputProps): ReactElement => {
  const { salary, updateInput, validateSalary } = useGigForm();

  return (
    <div className='detail-row-container'>
      <div className='bold sub-header-text gig-detail-title'>
        Salary/Pay
      </div>
      <GigTextInput
        classNames='gig-details-input'
        formValue={salary}
        id={`gig-salary-${props.gigId ? `-${props.gigId}` : ''}`}
        placeholder='yearly base salary (excluding opportunity for bonus)'
        setFormValue={updatedSalary => updateInput(GigFormFieldType.salary, updatedSalary)}
        validateFormValue={updatedSalary => validateSalary(updatedSalary)}
      />
    </div>
  );
};

export default SalaryInput;
