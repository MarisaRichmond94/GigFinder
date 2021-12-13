import { useCallback, useEffect, useState } from 'react';

import ApplicationsApi from 'api/applications';
import EmployersApi from 'api/employers';
import ApplicationsContext from 'providers/applications/context';
import { Application, ApplicationStatus } from 'types';

const ApplicationsProvider = (props: object) => {
  const [activeApplication, setActiveApplication] = useState<Application | undefined>();
  const [applications, setApplications] = useState<Application[] | undefined>();
  const [filteredApplications, setFilteredApplications] = useState<Application[] | undefined>();
  const [selectedApplicationIds, setSelectedApplicationIds] = useState([]);

  useEffect(() => {
    async function initializeApplications() {
      const employerId = window.localStorage.getItem('employerId');
      if (employerId) {
        let employer = await EmployersApi.getById(employerId);
        if (employer) {
          employer = employer.name;
          const appsByEmployer = await ApplicationsApi.get({ employer });
          setApplications(appsByEmployer?.filter(x => x.status !== ApplicationStatus.rejected));
        }
      }
    }

    initializeApplications();
    // eslint-disable-next-line
  }, []);

  const filterApplicationsByGigId = useCallback((gigId: string): void => {
    if (gigId) {
      setFilteredApplications(
        applications?.filter(x => x.gigId === gigId && x.status !== ApplicationStatus.rejected),
      );
    }
  }, [applications]);

  const toggleApplicationIsSelected = useCallback((applicationId: string): void => {
    selectedApplicationIds?.find(x => x === applicationId)
      ? setSelectedApplicationIds(selectedApplicationIds.filter(x => x !== applicationId))
      : setSelectedApplicationIds([...selectedApplicationIds, applicationId]);
  }, [selectedApplicationIds]);

  const updateApplicationStatus = useCallback(
    async (status: ApplicationStatus, applicationId: string) => {
      const applicationIndex = applications.findIndex(x => x.id === applicationId);
      const application = applications[applicationIndex];
      const updatedApplication = await ApplicationsApi.update(
        applicationId,
        {...application, status },
      );
      if (updatedApplication) {
        applications.splice(applicationIndex, 1, updatedApplication);
        setApplications(applications);
        const filteredApplicationIndex = filteredApplications.length
          ? filteredApplications.findIndex(x => x.id === applicationId)
          : -1;
        if (filteredApplicationIndex) {
          filteredApplications.splice(filteredApplicationIndex, 1, updatedApplication);
          setFilteredApplications(filteredApplications);
        }
      }
    },
    [applications, filteredApplications],
  );

  const updateApplicationStatuses = useCallback(
    async (status: ApplicationStatus, applicationId?: string) => {
      if (applicationId) {
        await updateApplicationStatus(status, applicationId);
      }
      for (let index = 0; index < selectedApplicationIds.length; index++) {
        const applicationId = selectedApplicationIds[index];
        await updateApplicationStatus(status, applicationId);
      }
    },
    [selectedApplicationIds, updateApplicationStatus],
  );

  const clearSelectedApplicationIds = useCallback(() => {
    setSelectedApplicationIds([]);
  }, []);

  const value = {
    activeApplication,
    applications,
    filteredApplications,
    selectedApplicationIds,
    clearSelectedApplicationIds,
    filterApplicationsByGigId,
    setActiveApplication,
    toggleApplicationIsSelected,
    updateApplicationStatuses,
  };

  return <ApplicationsContext.Provider value={value} {...props} />;
};

export default ApplicationsProvider;
