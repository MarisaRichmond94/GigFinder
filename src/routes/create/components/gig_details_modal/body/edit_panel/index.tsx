import './index.scss';

import { ReactElement, useEffect } from 'react';

import { useGigForm } from 'providers/gig_form';
import BenefitsInput from 'routes/create/components/inputs/benefits';
import DescriptionInput from 'routes/create/components/inputs/description';
import LocationInput from 'routes/create/components/inputs/location';
import RequirementsInput from 'routes/create/components/inputs/requirements';
import SalaryInput from 'routes/create/components/inputs/salary';
import TypeInput from 'routes/create/components/inputs/type';
import { Gig } from 'types';

type EditPanelProps = {
  gig: Gig,
};

const EditPanel = (props: EditPanelProps): ReactElement => {
  const { id } = props.gig;
  const { resetForm } = useGigForm();

  useEffect(() => {
    resetForm(props.gig);
    // eslint-disable-next-line
  }, [props.gig, resetForm]);

  return (
    <div className='gig-modal-body-panel' id='create-gig-details-modal-details-panel'>
      <SalaryInput gigId={id} />
      <TypeInput gigId={id} />
      <BenefitsInput gigId={id} />
      <DescriptionInput gigId={id} />
      <RequirementsInput gigId={id} />
      <LocationInput />
    </div>
  );
};

export default EditPanel;
