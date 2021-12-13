import './index.scss';

import { ReactElement } from 'react';

import GigDropdown from 'components/gig_input/dropdown';
import { useMessageTemplates } from 'providers/message_templates';

const ActiveMessageTemplate = (): ReactElement => {
  // context variables and functions
  const {
    activeMessageTemplateId,
    messageTemplates,
    updateActiveMessageTemplateId,
  } = useMessageTemplates();
  // derived variables
  const doesEmployerHaveMessageTemplates = !!messageTemplates?.length;
  const activeMessageTemplate = messageTemplates?.find(
    template => template.id === activeMessageTemplateId,
  );

  return (
    <div id='active-message-template-section'>
      <GigDropdown
        classNames='off-white-gig-dropdown'
        id='active-message-template-dropdown'
        isDisabled={!doesEmployerHaveMessageTemplates}
        options={
          messageTemplates?.map(messageTemplate => {
            return {
              id: messageTemplate.id,
              displayName: messageTemplate.name,
              onClick: () => updateActiveMessageTemplateId(messageTemplate.id),
            };
          }) || []
        }
        placeholder={
          doesEmployerHaveMessageTemplates ? 'Select A Message Template' : 'No Message Templates'
        }
        selectedOption={
          activeMessageTemplateId ? { displayName: activeMessageTemplate.name } : undefined
        }
      />
    </div>
  );
};

export default ActiveMessageTemplate;
