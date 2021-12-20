import './index.scss';

import { ReactElement } from 'react';

import GigButton from 'components/gig_button';
import { useViewport } from 'hooks/useViewport';
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
  // custom hook variables
  const { width } = useViewport();
  // derived variables
  const selectedCount = selectedApplicationIds.length;

  return (
    <div id='application-actions-container'>
      <ActiveMessageTemplate />
      <div id='application-actions-button-container'>
        <GigButton
          classNames='primary-green'
          id='contact-applicants-button'
          isDisabled={!activeMessageTemplateId}
          onClick={() => updateApplicationStatuses(ApplicationStatus.accepted)}
          text={selectedCount && width > 450 ? `Contact (${selectedCount})` : 'Contact'}
        />
        <GigButton
          classNames='primary-red'
          id='reject-applicants-button'
          onClick={() => updateApplicationStatuses(ApplicationStatus.rejected)}
          text={selectedCount && width > 450 ? `Reject (${selectedCount})` : 'Reject'}
        />
        <GigButton
          classNames='medium-grey'
          id='clear-selected-applicants-button'
          onClick={clearSelectedApplicationIds}
          text='Clear'
        />
      </div>
    </div>
  );
};

export default Actions;
