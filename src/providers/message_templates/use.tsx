import { useContext } from 'react';

import MessageTemplatesContext from 'providers/message_templates/context';

const useMessageTemplates = () => {
  const context = useContext(MessageTemplatesContext);
  if (context === undefined) {
    throw new Error('useMessageTemplates should only be used within the MessageTemplatesProvider.');
  }
  return context;
}

export default useMessageTemplates;
