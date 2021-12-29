import { useCallback, useEffect, useState } from 'react';

import EmployersApi from 'api/employers';
import MessageTemplatesApi from 'api/message_templates';
import MessageTemplatesContext from 'providers/message_templates/context';
import { MessageTemplate } from 'types';
import replaceExistingItemInList from 'utils/replaceExistingItemInList';

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

  const createMessageTemplate = useCallback((messageTemplate: MessageTemplate): void => {
    MessageTemplatesApi.post(messageTemplate);
    setMessageTemplates(
      messageTemplates?.length ? [...messageTemplates, messageTemplate] : [messageTemplate],
    );
  }, [messageTemplates]);

  const updateMessageTemplate = useCallback(
    (messageTemplateId: string, updatedMessageTemplate: MessageTemplate): void => {
      MessageTemplatesApi.update(messageTemplateId, updatedMessageTemplate);
      replaceExistingItemInList(updatedMessageTemplate, messageTemplates, setMessageTemplates);
    }, [messageTemplates],
  );

  const deleteMessageTemplate = useCallback((messageTemplateId: string): void => {
    if (messageTemplateId) {
      MessageTemplatesApi.deleteById(messageTemplateId);
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
