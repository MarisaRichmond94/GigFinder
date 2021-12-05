import './index.scss';

import { ReactElement } from 'react';

import { getBenefits, getRequirements, getSalary } from 'libs/gigs';
import { Gig } from 'types';

type ViewPanelProps = {
  gig: Gig,
}

const ViewPanel = (props: ViewPanelProps): ReactElement => {
  const { benefits, description, requirements, salary, type } = props.gig;

  return (
    <div className='gig-modal-body-panel' id='gig-details-modal-details-panel'>
      <div className='detail-row-flex-container' id='salary-details-container'>
        <div id='salary-details' className='bold sub-header-text'>Salary/Pay</div>
        <div className='sub-header-text'>{getSalary(salary)}</div>
      </div>
      <div className='detail-row-flex-container' id='type-details-container'>
        <div id='job-type-details' className='bold sub-header-text'>Job Type</div>
        <div className='sub-header-text'>{type}</div>
      </div>
      <div className='detail-row-container' id='benefits-details-container'>
        <div id='benefits-details' className='bold sub-header-text'>Benefits</div>
        {getBenefits(benefits)}
      </div>
      <div className='detail-row-container'>
        <div id='job-description-details' className='bold sub-header-text'>Description</div>
        <div className='details sub-header-text'>{description}</div>
      </div>
      <div className='detail-row-container'>
        <div id='requirements-details' className='bold sub-header-text'>Requirements</div>
        {getRequirements(requirements)}
      </div>
    </div>
  );
};

export default ViewPanel;
