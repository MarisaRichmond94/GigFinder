import './index.scss';

import { ReactElement } from 'react';

import GigButton from 'components/gig_button';
import { useEmployer } from 'providers/employer';
import { ApplicationStatus } from 'types';

const Actions = (): ReactElement => {
  // context provider variables and functions
  const {
    clearSelectedApplicationIds,
    selectedApplicationIds,
    updateApplicationStatuses,
  } = useEmployer();
  // derived variables
  const selectedCount = selectedApplicationIds.length;

  return (
    <div id='application-actions-container'>
      <GigButton
        classNames='primary-green'
        id='contact-applicants-button'
        onClick={() => updateApplicationStatuses(ApplicationStatus.accepted)}
        text={selectedCount ? `Contact (${selectedCount})` : 'Contact'}
      />
      <GigButton
        classNames='primary-red'
        id='reject-applicants-button'
        onClick={() => updateApplicationStatuses(ApplicationStatus.rejected)}
        text={selectedCount ? `Reject (${selectedCount})` : 'Reject'}
      />
      <GigButton
        classNames='medium-grey'
        id='clear-selected-applicants-button'
        onClick={clearSelectedApplicationIds}
        text='Clear Selected'
      />
    </div>
  );
};

export default Actions;
