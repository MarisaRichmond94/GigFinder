import './index.scss';

import { ReactElement } from 'react';
import { FaTimes } from 'react-icons/fa';

import GigButton from 'components/gig_button';
import SearchableGigInput from 'components/gig_input/searchable';
import { useGigForm } from 'providers/gig_form';

type BenefitsInputProps = {
  gigId: string,
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
        <div id='benefits-details' className='bold sub-header-text'>Benefits</div>
        {
          benefitOptions &&
          <SearchableGigInput
            classNames='off-white-text-input gig-details-benefits-input'
            clearKey='Enter'
            id={`gig-benefits-searchable-input-${props.gigId}`}
            onOptionSelect={benefit => addBenefit(benefit)}
            options={benefitOptions}
            placeholder='Add job benefits to make your gig more attractive to potential employees'
            selectedOptions={benefits}
          />
        }
      </div>
      <div className='detail-row-flex-container'>
        {
          !!benefits.length &&
          <div id='benefits-list'>
            {populateBenefits(benefits)}
          </div>
        }
      </div>
    </>
  );
};

export default BenefitsInput;
