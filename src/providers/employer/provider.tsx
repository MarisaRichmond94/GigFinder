import { useCallback, useState } from 'react';

import { deleteGigById, getGigsByEmployer } from 'api/gigs';
import EmployerContext from 'providers/employer/context';
import { Gig } from 'types';

const EmployerProvider = (props: object) => {
  const [activeGig, setActiveGig] = useState<Gig | undefined>();
  const [gigs, setGigs] = useState<Gig[] | undefined>();

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

  const updateGig = useCallback((gig: Gig): void => {
    const existingGigIndex = gigs.findIndex(g => g.id === gig.id);
    gigs.splice(existingGigIndex, 1, gig)
    setGigs(gigs);
  }, [gigs]);

  const value = {
    activeGig,
    gigs,
    closeGig,
    getGigs,
    setActiveGig,
    updateGig,
  };

  return <EmployerContext.Provider value={value} {...props} />;
};

export default EmployerProvider;
