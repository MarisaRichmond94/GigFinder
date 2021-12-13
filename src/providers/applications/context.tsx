import { createContext } from 'react';

import { Application, ApplicationStatus } from 'types';

interface ApplicationsContextType {
  activeApplication?: Application,
  applications?: Application[],
  filteredApplications?: Application[],
  selectedApplicationIds: string[],
  clearSelectedApplicationIds: () => void,
  filterApplicationsByGigId: (gigId: string) => void,
  setActiveApplication: (application: Application | undefined) => void,
  toggleApplicationIsSelected: (applicationId: string) => void,
  updateApplicationStatuses: (status: ApplicationStatus, applicationId?: string) => void,
}

const ApplicationsContext = createContext<undefined | ApplicationsContextType>(undefined);

export default ApplicationsContext;
