import { useCallback, useEffect, useState } from 'react';

import { deleteGigById, getGigsByEmployer } from 'api/gigs';
import {
  createMessageTemplate,
  deleteMessageTemplate,
  getMessageTemplatesByEmployerId,
  updateMessageTemplate,
} from 'api/messageTemplates';
import EmployerContext from 'providers/employer/context';
import { Gig } from 'types';

const EmployerProvider = (props: object) => {
  const [activeGig, setActiveGig] = useState<Gig | undefined>();
  const [activeMessageTemplateId, setActiveMessageTemplateId] = useState<string | undefined>();
  const [gigs, setGigs] = useState<Gig[] | undefined>();
  const [messageTemplates, setMessageTemplates] = useState();

  useEffect(() => {
    const localActiveMessageTemplateId = window.localStorage.getItem('activeMessageTemplateId');
    if (localActiveMessageTemplateId) setActiveMessageTemplateId(localActiveMessageTemplateId);
    // eslint-disable-next-line
  }, []);

  // gig functionality
  const getGigs = useCallback(async (employer: string) => {
    const employerGigs = await getGigsByEmployer(employer);
    setGigs(employerGigs);
  }, []);

  const closeGig = useCallback(async(gigId: string) => {
    if (gigId) {
      await deleteGigById(gigId);
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
  const createMessageTemplate = useCallback((employerId: string) => {

  }, []);

  const getMessageTemplates = useCallback((employerId: string) => {

  }, []);

  const updateMessageTemplate = useCallback((employerId: string) => {

  }, []);

  const deleteMessageTemplate = useCallback((employerId: string) => {

  }, []);

  const value = {
    activeGig,
    gigs,
    addGig,
    closeGig,
    getGigs,
    setActiveGig,
    updateGig,
  };

  return <EmployerContext.Provider value={value} {...props} />;
};

export default EmployerProvider;
