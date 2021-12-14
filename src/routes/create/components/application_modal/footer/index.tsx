import './index.scss';

import { ReactElement } from 'react';

import GigButton from 'components/gig_button';
import { useApplications } from 'providers/applications';
import { useMessageTemplates } from 'providers/message_templates';
import ActiveMessageTemplate from 'routes/create/components/active_message_template';
import { ApplicationStatus } from 'types';

type FooterProps = {
  close: () => void,
}

const Footer = (props: FooterProps): ReactElement => {
  // context provider variables and functions
  const { activeApplication, updateApplicationStatuses } = useApplications();
  const { activeMessageTemplateId } = useMessageTemplates();

  const updateStatus = (status: ApplicationStatus) => {
    updateApplicationStatuses(status, activeApplication.id);
    props.close();
  }

  return (
    <div id='application-modal-footer'>
      <ActiveMessageTemplate />
      <GigButton
        classNames='medium-grey dark-background sub-header-text application-modal-button'
        id='application-modal-cancel-button'
        onClick={props.close}
        text='Close'
      />
      <GigButton
        classNames='primary-green'
        id='contact-applicants-button'
        isDisabled={!activeMessageTemplateId}
        onClick={() => updateStatus(ApplicationStatus.accepted)}
        text='Contact'
      />
      <GigButton
        classNames='primary-red'
        id='reject-applicants-button'
        onClick={() => updateStatus(ApplicationStatus.rejected)}
        text='Reject'
      />
    </div>
  );
}

export default Footer;
