import { createContext } from 'react';

import { Gig, MessageTemplate } from 'types';

interface EmployerContextType {
  activeGig?: Gig,
  activeMessageTemplateId?: string,
  gigs?: Gig[],
  messageTemplates?: MessageTemplate[],
  addGig: (newGig: Gig) => void,
  closeGig: (gigId: string) => void,
  createMessageTemplate: (messageTemplate: MessageTemplate) => void,
  deleteMessageTemplate: (messageTemplateId: string) => void,
  getGigs: (employer: string) => void,
  getMessageTemplates: (employerId: string) => void,
  setActiveGig: (gig: Gig) => void,
  updateGig: (gig: Gig) => void,
  updateMessageTemplate: (messageTemplateId: string, messageTemplate: MessageTemplate) => void,
  updateActiveMessageTemplateId: (messageTemplateId: string) => void,
}

const EmployerContext = createContext<undefined | EmployerContextType>(undefined);

export default EmployerContext;
