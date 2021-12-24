import './index.scss';

import { ReactElement, useCallback } from 'react';

import GigButton from 'components/gig_button';
import { useApplications } from 'providers/applications';
import { useMessageTemplates } from 'providers/message_templates';
import ActiveMessageTemplate from 'routes/create/components/active_message_template';
import { ApplicationStatus } from 'types';

type FooterProps = {
  close: () => void,
};

const Footer = (props: FooterProps): ReactElement => {
  // provider variables and functions
  const { activeApplication, updateApplicationStatuses } = useApplications();
  const { activeMessageTemplateId } = useMessageTemplates();
  // destructured props
  const { close } = props;

  const updateStatus = useCallback((status: ApplicationStatus) => {
    updateApplicationStatuses(status, activeApplication.id);
    close();
  }, [activeApplication?.id, close, updateApplicationStatuses]);

  return (
    <div id='application-modal-footer'>
      <ActiveMessageTemplate />
      <div id='application-actions-button-container'>
        <GigButton
          classNames='medium-grey dark-background sub-header-text application-modal-button'
          onClick={close}
          text='Close'
        />
        <GigButton
          classNames='primary-green'
          isDisabled={!activeMessageTemplateId}
          onClick={() => updateStatus(ApplicationStatus.accepted)}
          text='Contact'
        />
        <GigButton
          classNames='primary-red'
          onClick={() => updateStatus(ApplicationStatus.rejected)}
          text='Reject'
        />
      </div>
    </div>
  );
};

export default Footer;
