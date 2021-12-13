import { createContext } from 'react';

import { Gig } from 'types';

interface EmployerContextType {
  activeGig?: Gig,
  gigs?: Gig[],
  addGig: (newGig: Gig) => void,
  closeGig: (gigId: string) => void,
  getGigs: (employer: string) => void,
  setActiveGig: (gig: Gig | undefined) => void,
  updateGig: (gig: Gig) => void,
}

const EmployerContext = createContext<undefined | EmployerContextType>(undefined);

export default EmployerContext;
