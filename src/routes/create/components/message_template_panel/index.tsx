import './index.scss';

import { ReactElement, useCallback, useState } from 'react';

import GigButton from 'components/gig_button';
import ControlledSearchableGigInput from 'components/gig_input/searchable/controlled';
import GigTextAreaInput from 'components/gig_input/text_area';
import { useViewport } from 'hooks/useViewport';
import { useAuth } from 'providers/auth';
import { useMessageTemplates } from 'providers/message_templates';
import settings from 'settings';
import { MessageTemplate } from 'types';
import generateGUID from 'utils/generateGUID';

const MessageTemplatePanel = (): ReactElement => {
  // provider variables and functions
  const { employer } = useAuth();
  const { createMessageTemplate, deleteMessageTemplate } = useMessageTemplates();
  const { updateMessageTemplate, messageTemplates } = useMessageTemplates();
  // local state variables and functions
  const [selectedTemplate, setSelectedTemplate] = useState<MessageTemplate | undefined>();
  const [name, setName] = useState('');
  const [template, setTemplate] = useState('');
  // hook variables
  const { width } = useViewport();
  // derived variables
  const isMobileView = width < settings.MIN_DESKTOP_WIDTH;

  const onChange = useCallback((updatedName: string): void => {
    const matchingTemplate = messageTemplates?.find(t => t.name === updatedName);
    if (matchingTemplate) {
      setSelectedTemplate(matchingTemplate);
      setTemplate(matchingTemplate.template);
    } else if (selectedTemplate) {
      setSelectedTemplate(undefined);
      setTemplate('');
    }
    setName(updatedName);
  }, [messageTemplates, selectedTemplate]);

  const onOptionSelect = useCallback((selectedName: string): void => {
    const matchingTemplate = messageTemplates?.find(t => t.name === selectedName);
    setSelectedTemplate(matchingTemplate);
    setName(matchingTemplate.name);
    setTemplate(matchingTemplate.template);
  }, [messageTemplates]);

  const resetPanel = useCallback((): void => {
    setSelectedTemplate(undefined);
    setName('');
    setTemplate('');
  }, []);

  const createNewMessageTemplate = useCallback((): void => {
    createMessageTemplate(
      {
        id: generateGUID(),
        employerId: employer.id,
        name,
        template,
      }
    );
    resetPanel();
  }, [createMessageTemplate, employer?.id, name, resetPanel, template]);

  const updateExistingMessageTemplate = useCallback((): void => {
    if (selectedTemplate) {
      updateMessageTemplate(
        selectedTemplate.id,
        {...selectedTemplate, template}
      );
      resetPanel();
    }
  }, [selectedTemplate, template, resetPanel, updateMessageTemplate]);

  const deleteExistingMessageTemplate = useCallback((): void => {
    if (selectedTemplate) deleteMessageTemplate(selectedTemplate.id);
    resetPanel();
  }, [deleteMessageTemplate, resetPanel, selectedTemplate]);

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
