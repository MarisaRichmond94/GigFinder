import { createContext } from 'react';

import { Application, ApplicationStatus, Gig, MessageTemplate } from 'types';

interface EmployerContextType {
  activeGig?: Gig,
  activeMessageTemplateId?: string,
  applications?: Application[],
  filteredApplications?: Application[],
  gigs?: Gig[],
  messageTemplates?: MessageTemplate[],
  selectedApplicationIds: string[],
  addGig: (newGig: Gig) => void,
  clearSelectedApplicationIds: () => void,
  closeGig: (gigId: string) => void,
  createMessageTemplate: (messageTemplate: MessageTemplate) => void,
  deleteMessageTemplate: (messageTemplateId: string) => void,
  getApplicationsByEmployer: (employer: string) => void,
  getGigs: (employer: string) => void,
  getMessageTemplates: (employerId: string) => void,
  setActiveApplication: (application: Application | undefined) => void,
  setActiveGig: (gig: Gig | undefined) => void,
  toggleSelectedApplicationId: (applicationId: string) => void,
  updateApplicationStatuses: (status: ApplicationStatus) => void,
  updateGig: (gig: Gig) => void,
  updateMessageTemplate: (messageTemplateId: string, messageTemplate: MessageTemplate) => void,
  updateActiveMessageTemplateId: (messageTemplateId: string) => void,
}

const EmployerContext = createContext<undefined | EmployerContextType>(undefined);

export default EmployerContext;
