import BaseApi from 'api/base';

class MessageTemplates extends BaseApi {
  constructor() {
    super('messageTemplates');
  }
}

const MessageTemplatesApi = new MessageTemplates();
export default MessageTemplatesApi;
