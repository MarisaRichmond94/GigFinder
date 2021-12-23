import './index.scss';

import { ReactElement } from 'react';

import { getBenefits, getRequirements, getSalary } from 'libs/gigs';
import { Gig } from 'types';

type DetailPanelProps = {
  gig: Gig,
};

const DetailPanel = (props: DetailPanelProps): ReactElement => {
  const { benefits, description, requirements, salary, type } = props.gig;

  return (
    <div className='find-gig-modal-body-panel' id='gig-details-modal-details-panel'>
      <div className='detail-row-flex-container'>
        <div id='salary-details' className='bold sub-header-text'>Salary/Pay</div>
        <div className='sub-header-text'>{getSalary(salary)}/year</div>
      </div>
      <div className='detail-row-flex-container'>
        <div id='job-type-details' className='bold sub-header-text'>Job Type</div>
        <div className='sub-header-text'>{type}</div>
      </div>
      <div className='detail-row-container'>
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

export default DetailPanel;
