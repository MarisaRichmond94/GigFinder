import './index.scss';

import { ReactElement, useCallback } from 'react';

import GigButton from 'components/gig_button';
import { useAuth } from 'providers/auth';
import { useEmployer } from 'providers/employer';
import { useGigForm } from 'providers/gig_form';
import { GigFormFieldType } from 'types';

const GigCreationActions = (): ReactElement => {
  const { employer } = useAuth();
  const { addGig } = useEmployer();
  const { getIsValidInput, resetForm, submitForm } = useGigForm();

  const createGig = useCallback(async() => {
    const newGig = await submitForm(undefined, employer.name);
    resetForm();
    addGig(newGig);
  }, [addGig, employer?.name, resetForm, submitForm]);

  return (
    <div className='detail-row-flex-container' id='gig-creation-button-container'>
      <GigButton classNames='medium-grey' onClick={resetForm} text='Clear' />
      <GigButton
        classNames='secondary-blue'
        isDisabled={!getIsValidInput(GigFormFieldType.all)}
        onClick={createGig}
        text='Create Gig'
      />
    </div>
  );
};

export default GigCreationActions;
