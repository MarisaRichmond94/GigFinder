import './index.scss';

import { ReactElement } from 'react';
import { BsCheckCircle, BsXCircle } from 'react-icons/bs';

import { Application } from 'types';

type BodyProps = {
  item: Application,
};

const Body = (props: BodyProps): ReactElement => {
  const { background, feedback } = props.item;
  const { passedBackgroundCheck, hasReleventCredentials, meetsMinimumRequirements} = background;
  const { additionalNotes, culturalFit, technicalFit } = feedback;
  const { positiveTraits, negativeTraits } = feedback;

  const backgroundBody = (
    <>
      <div className='application-detail-flex-container'>
        <div>
          {
            passedBackgroundCheck
              ? <BsCheckCircle className='text primary-green' />
              : <BsXCircle className='text primary-red' />
          }
        </div>
        <div className='paragraph-text'>Clean background check</div>
      </div>
      <div className='application-detail-flex-container'>
        <div>
          {
            hasReleventCredentials
              ? <BsCheckCircle className='text primary-green' />
              : <BsXCircle className='text primary-red' />
          }
        </div>
        <div className='paragraph-text'>Relevant education/experience credentials</div>
      </div>
      <div className='application-detail-flex-container'>
        <div>
          {
            meetsMinimumRequirements
              ? <BsCheckCircle className='text primary-green' />
              : <BsXCircle className='text primary-red' />
          }
        </div>
        <div className='paragraph-text'>Meets minimum requirements</div>
      </div>
    </>
  )

  const feedbackBody = (
    <>
      <div className='application-detail-flex-container'>
        <div className='bold paragraph-text baseline-aligned'>Positive:</div>
        <div className='paragraph-text'>
          {positiveTraits ? positiveTraits.join(', ') : 'N/A'}
        </div>
      </div>
      <div className='application-detail-flex-container'>
        <div className='bold paragraph-text baseline-aligned'>Negative:</div>
        <div className='paragraph-text'>
          {negativeTraits ? negativeTraits.join(', ') : 'N/A'}
        </div>
      </div>
      <div className='application-detail-flex-container'>
        <div className='bold paragraph-text'>Technical Fit:</div>
        <div className='paragraph-text'>
          {technicalFit ? `${technicalFit}/5` : 'N/A'}
        </div>
      </div>
      <div className='application-detail-flex-container'>
        <div className='bold paragraph-text'>Cultural Fit:</div>
        <div className='paragraph-text'>
          {culturalFit ? `${culturalFit}/5` : 'N/A'}
        </div>
      </div>
      <div
        className={
          additionalNotes
            ? 'application-detail-container'
            : 'application-detail-flex-container'
        }
      >
        <div className='bold paragraph-text'>Additional Details:</div>
        <div className='paragraph-text'>
          {additionalNotes ? additionalNotes : 'N/A'}
        </div>
      </div>
    </>
  )

  return (
    <div className='application-body'>
      {Object.values(feedback).every(x => x === null) ? backgroundBody : feedbackBody}
    </div>
  );
};

export default Body;
