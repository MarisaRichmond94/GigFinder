import './index.scss';

import { ReactElement } from 'react';

import GigButton from 'components/gig_button';
import { useAuth } from 'providers/auth';
import { useEmployer } from 'providers/employer';
import { GigFormProvider, useGigForm } from 'providers/gig_form';
import BenefitsInput from 'routes/create/components/inputs/benefits';
import DescriptionInput from 'routes/create/components/inputs/description';
import LocationInput from 'routes/create/components/inputs/location';
import RequirementsInput from 'routes/create/components/inputs/requirements';
import SalaryInput from 'routes/create/components/inputs/salary';
import TitleInput from 'routes/create/components/inputs/title';
import TypeInput from 'routes/create/components/inputs/type';
import { GigFormFieldType } from 'types';

const GigCreationPanel = (): ReactElement => {
  return (
    <GigFormProvider>
      <div id='gig-creation-panel'>
        <TitleInput />
        <TypeInput />
        <LocationInput />
        <BenefitsInput />
        <DescriptionInput />
        <RequirementsInput />
        <SalaryInput />
        <GigCreationActions />
      </div>
    </GigFormProvider>
  );
}

const GigCreationActions = (): ReactElement => {
  const { employer } = useAuth();
  const { addGig } = useEmployer();
  const { getIsValidInput, resetForm, submitForm } = useGigForm();

  const createGig = async() => {
    const newGig = await submitForm(undefined, employer.name);
    resetForm();
    addGig(newGig);
  }

  return (
    <div className='detail-row-flex-container' id='gig-creation-button-container'>
      <GigButton
        classNames='medium-grey'
        id='clear-create-gig-button'
        onClick={() => resetForm()}
        text='Clear'
      />
      <GigButton
        classNames='secondary-blue'
        id='create-gig-button'
        isDisabled={!getIsValidInput(GigFormFieldType.all)}
        onClick={createGig}
        text='Create Gig'
      />
    </div>
  );
}

export default GigCreationPanel;
