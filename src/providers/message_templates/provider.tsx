import { useCallback, useEffect, useState } from 'react';

import EmployersApi from 'api/employers';
import MessageTemplatesApi from 'api/message_templates';
import MessageTemplatesContext from 'providers/message_templates/context';
import { MessageTemplate } from 'types';

const MessageTemplatesProvider = (props: object) => {
  const [activeMessageTemplateId, setActiveMessageTemplateId] = useState<string | undefined>();
  const [messageTemplates, setMessageTemplates] = useState<MessageTemplate[] | undefined>();

  useEffect(() => {
    const localActiveMessageTemplateId = window.localStorage.getItem('activeMessageTemplateId');
    if (localActiveMessageTemplateId) setActiveMessageTemplateId(localActiveMessageTemplateId);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    async function initializeMessageTemplates() {
      const employerId = window.localStorage.getItem('employerId');
      if (employerId) {
        const employer = await EmployersApi.getById(employerId);
        if (employer) {
          const employerId = employer.id;
          const employerMessageTemplates = await MessageTemplatesApi.get({ employerId });
          setMessageTemplates(employerMessageTemplates);
        }
      }
    }

    initializeMessageTemplates();
    // eslint-disable-next-line
  }, []);

  const createMessageTemplate = useCallback(async (messageTemplate: MessageTemplate) => {
    const newMessageTemplate = await MessageTemplatesApi.post(messageTemplate);
    setMessageTemplates(
      messageTemplates ? [...messageTemplates, newMessageTemplate] : [newMessageTemplate],
    );
  }, [messageTemplates]);

  const updateMessageTemplate = useCallback(
    async (messageTemplateId: string, updatedMessageTemplate: MessageTemplate) => {
      const updatedTemplate = await MessageTemplatesApi.update(
        messageTemplateId,
        updatedMessageTemplate,
      );
      if (updatedTemplate) {
        const existingTemplateIndex = messageTemplates.findIndex(t => t.id === updatedTemplate.id);
        const messageTemplatesCopy = [...messageTemplates];
        messageTemplatesCopy.splice(existingTemplateIndex, 1, updatedTemplate)
        setMessageTemplates(messageTemplatesCopy);
      }
    }, [messageTemplates],
  );

  const deleteMessageTemplate = useCallback(async (messageTemplateId: string) => {
    if (messageTemplateId) {
      await MessageTemplatesApi.deleteById(messageTemplateId);
      setMessageTemplates(messageTemplates.filter(t => t.id !== messageTemplateId));
    }
  }, [messageTemplates]);

  const updateActiveMessageTemplateId = useCallback(async (messageTemplateId: string) => {
    if (messageTemplateId !== activeMessageTemplateId) {
      setActiveMessageTemplateId(messageTemplateId);
      window.localStorage.setItem('activeMessageTemplateId', messageTemplateId);
    }
  }, [activeMessageTemplateId]);

  const value = {
    activeMessageTemplateId,
    messageTemplates,
    createMessageTemplate,
    deleteMessageTemplate,
    updateMessageTemplate,
    updateActiveMessageTemplateId,
  };

  return <MessageTemplatesContext.Provider value={value} {...props} />;
};

export default MessageTemplatesProvider;
