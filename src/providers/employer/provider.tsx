import { useCallback, useEffect, useState } from 'react';

import ApplicationsApi from 'api/applications';
import GigsApi from 'api/gigs';
import MessageTemplatesApi from 'api/message_templates';
import EmployerContext from 'providers/employer/context';
import { Application, ApplicationStatus, Gig, MessageTemplate } from 'types';

const EmployerProvider = (props: object) => {
  const [activeApplication, setActiveApplication] = useState<Application | undefined>();
  const [activeGig, setActiveGig] = useState<Gig | undefined>();
  const [activeMessageTemplateId, setActiveMessageTemplateId] = useState<string | undefined>();
  const [applications, setApplications] = useState<Application[] | undefined>();
  const [filteredApplications, setFilteredApplications] = useState<Application[] | undefined>();
  const [gigs, setGigs] = useState<Gig[] | undefined>();
  const [messageTemplates, setMessageTemplates] = useState<MessageTemplate[] | undefined>();
  const [selectedApplicationIds, setSelectedApplicationIds] = useState([]);

  useEffect(() => {
    const localActiveMessageTemplateId = window.localStorage.getItem('activeMessageTemplateId');
    if (localActiveMessageTemplateId) setActiveMessageTemplateId(localActiveMessageTemplateId);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (activeGig) {
      setFilteredApplications(
        applications?.filter(
          app => app.gigId === activeGig.id && app.status !== ApplicationStatus.rejected,
        )
      );
    }
  }, [activeGig, applications]);

  // gig CRUD functionality
  const getGigs = useCallback(async (employer: string) => {
    const employerGigs = await GigsApi.get({ employer });
    setGigs(employerGigs);
  }, []);

  const closeGig = useCallback(async(gigId: string) => {
    if (gigId) {
      await GigsApi.deleteById(gigId);
      setGigs(gigs?.filter(gig => gig.id !== gigId));
    }
  }, [gigs]);

  const addGig = useCallback((newGig: Gig): void => {
    setGigs([newGig, ...gigs]);
  }, [gigs]);

  const updateGig = useCallback((gig: Gig): void => {
    const existingGigIndex = gigs.findIndex(g => g.id === gig.id);
    gigs.splice(existingGigIndex, 1, gig)
    setGigs(gigs);
  }, [gigs]);

  // message template CRUD functionality
  const createMessageTemplate = useCallback(async (messageTemplate: MessageTemplate) => {
    const newMessageTemplate = await MessageTemplatesApi.post(messageTemplate);
    setMessageTemplates([...messageTemplates, newMessageTemplate]);
  }, [messageTemplates]);

  const getMessageTemplates = useCallback(async (employerId: string) => {
    const employerMessageTemplates = await MessageTemplatesApi.get({ employerId });
    setMessageTemplates(employerMessageTemplates);
  }, []);

  const updateMessageTemplate = useCallback(
    async (messageTemplateId: string, updatedMessageTemplate: MessageTemplate) => {
      const updatedTemplate = await MessageTemplatesApi.update(
        messageTemplateId,
        updatedMessageTemplate,
      );
      if (updatedTemplate) {
        const existingTemplateIndex = messageTemplates.findIndex(t => t.id === updatedTemplate.id);
        const messageTemplatesCopy = [...messageTemplates];
        messageTemplatesCopy.splice(existingTemplateIndex, 1, updatedTemplate)
        setMessageTemplates(messageTemplatesCopy);
      }
    }, [messageTemplates],
  );

  const deleteMessageTemplate = useCallback(async (messageTemplateId: string) => {
    if (messageTemplateId) {
      await MessageTemplatesApi.deleteById(messageTemplateId);
      setMessageTemplates(messageTemplates.filter(t => t.id !== messageTemplateId));
    }
  }, [messageTemplates]);

  const updateActiveMessageTemplateId = useCallback(async (messageTemplateId: string) => {
    if (messageTemplateId !== activeMessageTemplateId) {
      setActiveMessageTemplateId(messageTemplateId);
      window.localStorage.setItem('activeMessageTemplateId', messageTemplateId);
    }
  }, [activeMessageTemplateId]);

  // candidate CRUD functionality
  const getApplicationsByEmployer = useCallback(async (employer: string) => {
    if (employer) {
      const applicationsByEmployer = await ApplicationsApi.get({ employer });
      setApplications(
        applicationsByEmployer?.filter(app => app.status !== ApplicationStatus.rejected),
      );
    }
  }, []);

  const toggleSelectedApplicationId = useCallback((applicationId: string): void => {
    selectedApplicationIds?.find(x => x === applicationId)
      ? setSelectedApplicationIds(selectedApplicationIds.filter(x => x !== applicationId))
      : setSelectedApplicationIds([...selectedApplicationIds, applicationId]);
  }, [selectedApplicationIds]);

  const updateApplicationStatuses = useCallback(async (status: ApplicationStatus) => {
    for (let index = 0; index < selectedApplicationIds.length; index++) {
      const applicationId = selectedApplicationIds[index];
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
    }
  }, [applications, filteredApplications, selectedApplicationIds]);

  const clearSelectedApplicationIds = useCallback(() => {
    setSelectedApplicationIds([]);
  }, []);

  const value = {
    activeGig,
    activeMessageTemplateId,
    applications,
    filteredApplications,
    gigs,
    messageTemplates,
    selectedApplicationIds,
    addGig,
    clearSelectedApplicationIds,
    closeGig,
    createMessageTemplate,
    deleteMessageTemplate,
    getApplicationsByEmployer,
    getGigs,
    getMessageTemplates,
    setActiveApplication,
    setActiveGig,
    toggleSelectedApplicationId,
    updateApplicationStatuses,
    updateGig,
    updateMessageTemplate,
    updateActiveMessageTemplateId,
  };

  return <EmployerContext.Provider value={value} {...props} />;
};

export default EmployerProvider;
