import './index.scss';

import { ReactElement } from 'react';

import GigButton from 'components/gig_button';
import { useApplications } from 'providers/applications';
import { useMessageTemplates } from 'providers/message_templates';
import ActiveMessageTemplate from 'routes/create/components/active_message_template';
import { ApplicationStatus } from 'types';

const Actions = (): ReactElement => {
  // context provider variables and functions
  const { activeMessageTemplateId } = useMessageTemplates();
  const {
    selectedApplicationIds,
    clearSelectedApplicationIds,
    updateApplicationStatuses,
  } = useApplications();
  // derived variables
  const selectedCount = selectedApplicationIds.length;

  return (
    <div id='application-actions-container'>
      <ActiveMessageTemplate />
      <GigButton
        classNames='primary-green'
        id='contact-applicants-button'
        isDisabled={!activeMessageTemplateId}
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
