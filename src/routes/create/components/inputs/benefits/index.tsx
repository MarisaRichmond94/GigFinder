import './index.scss';

import { ReactElement } from 'react';
import { FaTimes } from 'react-icons/fa';

import GigButton from 'components/gig_button';
import UncontrolledSearchableGigInputProps from 'components/gig_input/searchable/uncontrolled';
import { useGigForm } from 'providers/gig_form';

type BenefitsInputProps = {
  gigId?: string,
}

const BenefitsInput = (props: BenefitsInputProps): ReactElement => {
  const { benefits, benefitOptions, addBenefit, deleteBenefit } = useGigForm();

  const populateBenefits = (benefits: string[]): ReactElement[] => {
    return benefits.map((benefit, index) => {
      return (
        <GigButton
          classNames='benefit-button'
          id={`${benefit}-benefit-button`}
          key={`${benefit}-benefit-button`}
          onClick={() => deleteBenefit(benefit)}
          textBlock={
            <div className='benefit-item' key={`${benefit.replace(' ', '-')}-${index}`}>
              {benefit}&nbsp;&nbsp;
              <FaTimes />
            </div>
          }
        />
      )
    });
  }

  return (
    <>
      <div className='detail-row-flex-container'>
        <div id='benefits-details' className='bold sub-header-text gig-detail-title'>
          Benefits
        </div>
        {
          benefitOptions &&
          <UncontrolledSearchableGigInputProps
            classNames='off-white-text-input gig-details-benefits-input'
            clearKey='Enter'
            id={`gig-benefits-searchable-input${props.gigId ? `-${props.gigId}` : ''}`}
            onOptionSelect={benefit => addBenefit(benefit)}
            options={benefitOptions}
            placeholder='Add job benefits to make your gig more attractive to potential employees'
            selectedOptions={benefits}
          />
        }
      </div>
      {
        !!benefits?.length &&
        <div className='detail-row-flex-container'>
          <div id='benefits-list'>
            {populateBenefits(benefits)}
          </div>
        </div>
      }
    </>
  );
};

export default BenefitsInput;
