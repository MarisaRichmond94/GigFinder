import './index.scss';

import { ReactElement } from 'react';

import { GigWithReviews } from 'types';

type DetailPanelProps = {
  gig: GigWithReviews,
}

const DetailPanel = (props: DetailPanelProps): ReactElement => {
  const { id, benefits, description, requirements, salary, type } = props.gig;

  const getSalary = (): string => {
    const [dollars, cents] = salary.split('.');
    const insertIndex = dollars.length - 3;
    return `${[dollars.slice(0, insertIndex), ',', dollars.slice(insertIndex)].join('')}.${cents}`;
  }

  const getBenefits = (): ReactElement => {
    if (benefits.length) {
      return (
        <ul id='benefits-list'>
          {benefits.map(benefit => {
            return (
              <li className='sub-header-text' key={`benefit-${benefit}`}>{benefit}</li>
            )
          })}
        </ul>
      );
    }

    return <div className='details sub-header-text'>Employer chose not to list any benefits</div>;
  }

  const getRequirements = (): ReactElement => {
    return (
      <ul id='requirements-list'>
        {requirements.split('.').map((requirement, index) => {
          if (requirement === '') return;
          return (
            <li className='sub-header-text' key={`requirement-${index}`}>{requirement}</li>
          )
        })}
      </ul>
    )
  }

  return (
    <div className='gig-modal-body-panel' id='gig-details-modal-details-panel'>
      <div className='detail-row-flex-container'>
        <div id='salary-details' className='bold sub-header-text'>Salary/Pay</div>
        <div className='sub-header-text'>{getSalary()}/year</div>
      </div>
      <div className='detail-row-flex-container'>
        <div id='job-type-details' className='bold sub-header-text'>Job Type</div>
        <div className='sub-header-text'>{type}</div>
      </div>
      <div className='detail-row-container'>
        <div id='benefits-details' className='bold sub-header-text'>Benefits</div>
        {getBenefits()}
      </div>
      <div className='detail-row-container'>
        <div id='job-description-details' className='bold sub-header-text'>Description</div>
        <div className='details sub-header-text'>{description}</div>
      </div>
      <div className='detail-row-container'>
        <div id='requirements-details' className='bold sub-header-text'>Requirements</div>
        {getRequirements()}
      </div>
    </div>
  );
}

export default DetailPanel;
