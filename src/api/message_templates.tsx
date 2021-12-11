import axios from 'axios';

import settings from 'settings';
import { MessageTemplate } from 'types';

const createMessageTemplate = async (template: MessageTemplate): Promise<MessageTemplate> => {
  const response = await axios.post(`${settings.BASE_SERVER_URL}/messageTemplates`);
  if (response?.data) {
    return response.data;
  }
};

const getMessageTemplatesByEmployerId = async (employerId: string): Promise<MessageTemplate[]> => {
  const response = await axios.get(`${settings.BASE_SERVER_URL}/messageTemplates`);
  if (response?.data) {
    return response.data;
  }
};

const updateMessageTemplate = async (): Promise<MessageTemplate> => {
  const response = await axios.patch(`${settings.BASE_SERVER_URL}/messageTemplates`);
  if (response?.data) {
    return response.data;
  }
};

const deleteMessageTemplate = async (messageTemplateId: string): Promise<MessageTemplate> => {
  const response = await axios.delete(
    `${settings.BASE_SERVER_URL}/messageTemplates/${messageTemplateId}`,
  );
  if (response?.data) {
    return response.data;
  }
};

export {
  createMessageTemplate,
  deleteMessageTemplate,
  getMessageTemplatesByEmployerId,
  updateMessageTemplate,
};
