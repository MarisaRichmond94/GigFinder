import './index.scss';

import { ReactElement, useCallback } from 'react';

import { Application } from 'types';

type DetailsPanelProps = {
  application: Application,
};

const DetailsPanel = (props: DetailsPanelProps): ReactElement => {
  // destructured prop variables
  const { candidate, currentPosition, previousPosition } = props.application;
  const { address, email, phone, college, degree } = candidate;
  const { title: currTitle, employer: currEmployer, highlights: currHighlights } = currentPosition;
  const { title: prevTitle, employer: prevEmployer, highlights: prevHighlights } = previousPosition;

  const getFormattedHighlights = useCallback((highlights: string): ReactElement => {
    return (
      <ul id='highlights-list'>
        {highlights.split('.').map((highlight, index) => {
          if (highlight === '') return undefined;
          return (
            <li className='paragraph-text' key={`highlight-${index}`}>
              {highlight.trim()}
            </li>
          )
        })}
      </ul>
    );
  }, []);

  if (!props.application) return null;

  return (
    <div id='application-details-panel'>
      <div className='application-detail-flex-container'>
        <div className='bold paragraph-text'>Address:</div>
        <div className='paragraph-text'>{address}</div>
      </div>
      <div className='application-detail-flex-container'>
        <div className='bold paragraph-text'>Email:</div>
        <div className='paragraph-text'>{email}</div>
      </div>
      <div className='application-detail-flex-container'>
        <div className='bold paragraph-text'>Phone:</div>
        <div className='paragraph-text'>{phone}</div>
      </div>
      <div className='application-detail-container'>
        <div className='bold paragraph-text'>Education:</div>
        <div className='paragraph-text'>{degree}</div>
        <div className='paragraph-text'>from {college}</div>
      </div>
      <div className='application-detail-container'>
        <div className='bold paragraph-text'>Current Position:</div>
        <div className='paragraph-text'>{currTitle} at {currEmployer}</div>
        {getFormattedHighlights(currHighlights)}
      </div>
      <div className='application-detail-container'>
        <div className='bold paragraph-text'>Previous Position:</div>
        <div className='paragraph-text'>{prevTitle} at {prevEmployer}</div>
        {getFormattedHighlights(prevHighlights)}
      </div>
    </div>
  );
};

export default DetailsPanel;
