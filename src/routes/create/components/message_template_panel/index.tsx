import './index.scss';

import { ReactElement, useState } from 'react';

import GigButton from 'components/gig_button';
import ControlledSearchableGigInput from 'components/gig_input/searchable/controlled';
import GigTextAreaInput from 'components/gig_input/text_area';
import { useViewport } from 'hooks/useViewport';
import { useAuth } from 'providers/auth';
import { useMessageTemplates } from 'providers/message_templates';
import { MessageTemplate } from 'types';
import generateGUID from 'utils/generateGUID';

const MessageTemplatePanel = (): ReactElement => {
  // context variables and functions
  const { employer } = useAuth();
  const {
    messageTemplates,
    createMessageTemplate,
    deleteMessageTemplate,
    updateMessageTemplate,
  } = useMessageTemplates();
  // hook variables
  const { width } = useViewport();
  // local state variables and functions
  const [selectedTemplate, setSelectedTemplate] = useState<MessageTemplate | undefined>();
  const [name, setName] = useState('');
  const [template, setTemplate] = useState('');
  // derived variables
  const isMobileView = width < 850;

  const onChange = (updatedName: string): void => {
    const matchingTemplate = messageTemplates?.find(t => t.name === updatedName);
    if (matchingTemplate) {
      setSelectedTemplate(matchingTemplate);
      setTemplate(matchingTemplate.template);
    } else if (selectedTemplate) {
      setSelectedTemplate(undefined);
      setTemplate('');
    }
    setName(updatedName);
  };

  const onOptionSelect = (selectedName: string): void => {
    const matchingTemplate = messageTemplates?.find(t => t.name === selectedName);
    setSelectedTemplate(matchingTemplate);
    setName(matchingTemplate.name);
    setTemplate(matchingTemplate.template);
  }

  const resetPanel = () => {
    setSelectedTemplate(undefined);
    setName('');
    setTemplate('');
  };

  const createNewMessageTemplate = () => {
    createMessageTemplate(
      {
        id: generateGUID(),
        employerId: employer.id,
        name,
        template,
      }
    );
    resetPanel();
  };

  const updateExistingMessageTemplate = () => {
    if (selectedTemplate) {
      updateMessageTemplate(
        selectedTemplate.id,
        {...selectedTemplate, template}
      );
      resetPanel();
    }
  };

  const deleteExistingMessageTemplate = () => {
    if (selectedTemplate) deleteMessageTemplate(selectedTemplate.id);
    resetPanel();
  }

  return (
    <div id='message-template-panel'>
      <ControlledSearchableGigInput
        classNames='off-white'
        formValue={name}
        id='message-template-panel-selector'
        options={messageTemplates?.map(t => t.name)}
        placeholder='Select existing template or create a new one'
        onChange={onChange}
        onOptionSelect={onOptionSelect}
      />
      <GigTextAreaInput
        classNames='off-white'
        formValue={template}
        id='message-template-panel-message'
        placeholder='Templated message (e.g. "Hello, {{candidate}}, I saw that you were interested in our {{gig}} role...")'
        setFormValue={updatedTemplate => setTemplate(updatedTemplate)}
      />
      <div id='message-template-actions'>
        {
          selectedTemplate &&
          <GigButton
            classNames='medium-grey'
            id='message-template-delete-button'
            onClick={deleteExistingMessageTemplate}
            text='Delete Template'
          />
        }
        {
          selectedTemplate
            ? (
              <GigButton
                classNames={isMobileView ? 'primary-blue' : 'secondary-blue'}
                id='message-template-update-button'
                isDisabled={template === selectedTemplate.template}
                onClick={updateExistingMessageTemplate}
                text='Update Template'
              />
            )
            : (
              <GigButton
                classNames={isMobileView ? 'primary-blue' : 'secondary-blue'}
                id='message-template-create-button'
                onClick={createNewMessageTemplate}
                text='Create Template'
              />
            )
        }
      </div>
    </div>
  );
};

export default MessageTemplatePanel;
