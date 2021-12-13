import './index.scss';

import { ReactElement } from 'react';

import GigButton from 'components/gig_button';
import { useApplications } from 'providers/applications';
import { useMessageTemplates } from 'providers/message_templates';
import ActiveMessageTemplate from 'routes/create/components/active_message_template';
import { ApplicationStatus } from 'types';

type FooterProps = {
  cancel: () => void,
}

const Footer = (props: FooterProps): ReactElement => {
  // context provider variables and functions
  const { activeApplication, updateApplicationStatuses } = useApplications();
  const { activeMessageTemplateId } = useMessageTemplates();

  return (
    <div id='application-modal-footer'>
      <ActiveMessageTemplate />
      <GigButton
        classNames='medium-grey dark-background sub-header-text application-modal-button'
        id='application-modal-cancel-button'
        onClick={props.cancel}
        text='Cancel'
      />
      <GigButton
        classNames='primary-green'
        id='contact-applicants-button'
        isDisabled={!activeMessageTemplateId}
        onClick={() => updateApplicationStatuses(ApplicationStatus.accepted, activeApplication.id)}
        text='Contact'
      />
      <GigButton
        classNames='primary-red'
        id='reject-applicants-button'
        onClick={() => updateApplicationStatuses(ApplicationStatus.rejected, activeApplication.id)}
        text='Reject'
      />
    </div>
  );
}

export default Footer;
