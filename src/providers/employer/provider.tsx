import { useCallback, useEffect, useState } from 'react';

import GigsApi from 'api/gigs';
import MessageTemplatesApi from 'api/message_templates';
import EmployerContext from 'providers/employer/context';
import { Gig, MessageTemplate } from 'types';

const EmployerProvider = (props: object) => {
  const [activeGig, setActiveGig] = useState<Gig | undefined>();
  const [activeMessageTemplateId, setActiveMessageTemplateId] = useState<string | undefined>();
  const [gigs, setGigs] = useState<Gig[] | undefined>();
  const [messageTemplates, setMessageTemplates] = useState<MessageTemplate[] | undefined>();

  useEffect(() => {
    const localActiveMessageTemplateId = window.localStorage.getItem('activeMessageTemplateId');
    if (localActiveMessageTemplateId) setActiveMessageTemplateId(localActiveMessageTemplateId);
    // eslint-disable-next-line
  }, []);

  // gig functionality
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

  const value = {
    activeGig,
    activeMessageTemplateId,
    gigs,
    messageTemplates,
    addGig,
    closeGig,
    createMessageTemplate,
    deleteMessageTemplate,
    getGigs,
    getMessageTemplates,
    setActiveGig,
    updateGig,
    updateMessageTemplate,
    updateActiveMessageTemplateId,
  };

  return <EmployerContext.Provider value={value} {...props} />;
};

export default EmployerProvider;
