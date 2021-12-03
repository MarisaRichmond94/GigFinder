import { createContext } from 'react';

import { Gig } from 'types';

interface EmployerContextType {
  activeGig?: Gig,
  gigs?: Gig[],
  closeGig: (gigId: string) => void,
  getGigs: (employer: string) => void,
  setActiveGig: (gig: Gig) => void,
}

const EmployerContext = createContext<undefined | EmployerContextType>(undefined);

export default EmployerContext;
