import './index.scss';

import { ReactElement, useEffect } from 'react';

import { getRequirements } from 'libs/gigs';
import { useGigForm } from 'providers/gig_form';
import BenefitsInput from 'routes/create/components/gig_details_modal/body/benefits';
import DescriptionInput from 'routes/create/components/gig_details_modal/body/description';
import RequirementsInput from 'routes/create/components/gig_details_modal/body/requirements';
import SalaryInput from 'routes/create/components/gig_details_modal/body/salary';
import TypeInput from 'routes/create/components/gig_details_modal/body/type';
import { Gig } from 'types';

type EditPanelProps = {
  gig: Gig,
}

const EditPanel = (props: EditPanelProps): ReactElement => {
  const { id } = props.gig;
  const { resetForm } = useGigForm();

  useEffect(() => {
    resetForm(props.gig);
    // eslint-disable-next-line
  }, [props.gig, resetForm]);

  return (
    <div className='gig-modal-body-panel' id='gig-details-modal-details-panel'>
      <SalaryInput gigId={id} />
      <TypeInput gigId={id} />
      <BenefitsInput gigId={id} />
      <DescriptionInput gigId={id} />
      <RequirementsInput gigId={id} />
    </div>
  );
};

export default EditPanel;
