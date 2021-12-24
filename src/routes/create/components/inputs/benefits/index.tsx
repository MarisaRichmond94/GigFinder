import './index.scss';

import { ReactElement, useCallback } from 'react';
import { FaTimes } from 'react-icons/fa';

import GigButton from 'components/gig_button';
import UncontrolledSearchableGigInputProps from 'components/gig_input/searchable/uncontrolled';
import { useGigForm } from 'providers/gig_form';

type BenefitsInputProps = {
  gigId?: string,
};

const BenefitsInput = (props: BenefitsInputProps): ReactElement => {
  const { benefits, benefitOptions, addBenefit, deleteBenefit } = useGigForm();

  const populateBenefits = useCallback((benefits: string[]): ReactElement[] => {
    return benefits.map((benefit, index) => {
      return (
        <GigButton
          classNames='benefit-button'
          key={`${benefit}-benefit-button`}
          onClick={() => deleteBenefit(benefit)}
          textBlock={
            <div className='benefit-item' key={`${benefit.replace(' ', '-')}-${index}`}>
              <div className='hide-overflow-ellipsis' title={benefit}>{benefit}</div>&nbsp;
              <FaTimes />
            </div>
          }
        />
      )
    });
  }, [deleteBenefit]);

  return (
    <>
      <div className='detail-row-container'>
        <div id='benefits-details' className='bold sub-header-text gig-detail-title'>Benefits</div>
        {
          benefitOptions &&
          <UncontrolledSearchableGigInputProps
            classNames='off-white gig-details-benefits-input'
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
        <div className='detail-row-container'>
          <div id='benefits-list'>
            {populateBenefits(benefits)}
          </div>
        </div>
      }
    </>
  );
};

export default BenefitsInput;
