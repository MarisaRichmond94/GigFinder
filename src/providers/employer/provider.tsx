import { useCallback, useEffect, useState } from 'react';

import GigsApi from 'api/gigs';
import { usePrevious } from 'hooks/usePrevious';
import { useAuth } from 'providers/auth';
import EmployerContext from 'providers/employer/context';
import { Gig } from 'types';

const EmployerProvider = (props: object) => {
  // provider variables
  const { employer } = useAuth();
  const employerName = employer?.name;
  const prevEmployerName = usePrevious(employerName);
  // local state variables and functions
  const [activeGig, setActiveGig] = useState<Gig | undefined>();
  const [gigs, setGigs] = useState<Gig[] | undefined>();

  const getGigs = useCallback(async (employer: string) => {
    const employerGigs = await GigsApi.get({ employer });
    setGigs(employerGigs);
  }, []);

  useEffect(() => {
    if (employerName && employerName !== prevEmployerName) getGigs(employerName);
  }, [employerName, prevEmployerName, getGigs]);

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

  const value = {
    activeGig,
    gigs,
    addGig,
    closeGig,
    setActiveGig,
    updateGig,
  };

  return <EmployerContext.Provider value={value} {...props} />;
};

export default EmployerProvider;
