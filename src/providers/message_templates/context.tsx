import { createContext } from 'react';

import { MessageTemplate } from 'types';

interface MessageTemplatesContextType {
  activeMessageTemplateId?: string,
  messageTemplates?: MessageTemplate[],
  createMessageTemplate: (messageTemplate: MessageTemplate) => void,
  deleteMessageTemplate: (messageTemplateId: string) => void,
  updateMessageTemplate: (messageTemplateId: string, messageTemplate: MessageTemplate) => void,
  updateActiveMessageTemplateId: (messageTemplateId: string) => void,
}

const MessageTemplatesContext = createContext<undefined | MessageTemplatesContextType>(undefined);

export default MessageTemplatesContext;
