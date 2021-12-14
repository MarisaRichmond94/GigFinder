import { useCallback, useEffect, useState } from 'react';

import ApplicationsApi from 'api/applications';
import EmployersApi from 'api/employers';
import TraitsApi from 'api/traits';
import ApplicationsContext from 'providers/applications/context';
import { Application, ApplicationStatus, Feedback } from 'types';
import replaceExistingItemInList from 'utils/replaceExistingItemInList';

const ApplicationsProvider = (props: object) => {
  const [activeApplication, setActiveApplication] = useState<Application | undefined>();
  const [applications, setApplications] = useState<Application[] | undefined>();
  const [filteredApplications, setFilteredApplications] = useState<Application[] | undefined>();
  const [negativeTraits, setNegativeTraits] = useState<string[] | undefined>();
  const [positiveTraits, setPositiveTraits] = useState<string[] | undefined>();
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

      const traits = await TraitsApi.get();
      if (traits) {
        setNegativeTraits(traits.negative);
        setPositiveTraits(traits.positive);
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
        if (activeApplication && activeApplication.id === updatedApplication.id) {
          setActiveApplication(updatedApplication);
        }
        if (status === ApplicationStatus.rejected) {
          setApplications(applications.filter(x => x.id !== updatedApplication.id));
          if (filteredApplications) {
            setFilteredApplications(
              filteredApplications.filter(x => x.id !== updatedApplication.id),
            );
          }
        } else {
          replaceExistingItemInList(updatedApplication, applications, setApplications);
          replaceExistingItemInList(
            updatedApplication,
            filteredApplications,
            setFilteredApplications,
          );
        }
      }
    },
    [activeApplication, applications, filteredApplications],
  );

  const updateApplicationStatuses = useCallback(
    async (status: ApplicationStatus, applicationId?: string) => {
      if (applicationId) {
        await updateApplicationStatus(status, applicationId);
      } else {
        for (let index = 0; index < selectedApplicationIds.length; index++) {
          const applicationId = selectedApplicationIds[index];
          await updateApplicationStatus(status, applicationId);
        }
      }
      setSelectedApplicationIds([]);
    },
    [selectedApplicationIds, updateApplicationStatus],
  );

  const clearSelectedApplicationIds = useCallback(() => {
    setSelectedApplicationIds([]);
  }, []);

  const updateApplicationFeedback = useCallback(async (feedback: Feedback) => {
    if (activeApplication) {
      const updatedApplication = await ApplicationsApi.update(
        activeApplication.id,
        {...activeApplication, feedback },
      );
      if (updatedApplication) {
        setActiveApplication(updatedApplication);
        replaceExistingItemInList(updatedApplication, applications, setApplications);
        replaceExistingItemInList(
          updatedApplication,
          filteredApplications,
          setFilteredApplications,
        );
      }
    }
  }, [activeApplication, applications, filteredApplications]);

  const value = {
    activeApplication,
    applications,
    filteredApplications,
    negativeTraits,
    positiveTraits,
    selectedApplicationIds,
    clearSelectedApplicationIds,
    filterApplicationsByGigId,
    setActiveApplication,
    toggleApplicationIsSelected,
    updateApplicationFeedback,
    updateApplicationStatuses,
  };

  return <ApplicationsContext.Provider value={value} {...props} />;
};

export default ApplicationsProvider;
