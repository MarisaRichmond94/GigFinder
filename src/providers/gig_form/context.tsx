import { createContext } from 'react';

import { Gig, GigFormFieldType, GigType } from 'types';

interface GigFormContextType {
  benefitOptions: string[],
  benefits: string[],
  description?: string,
  gigTypes?: GigType[],
  requirements?: string,
  salary?: string,
  type?: GigType,
  isValidSalary: boolean,
  addBenefit: (benefit: string) => void,
  deleteBenefit: (benefit: string) => void,
  resetForm: (gig: Gig) => void,
  submitForm: (gig: Gig) => Gig,
  updateInput: (type: GigFormFieldType, value: string | string[] | GigType) => void,
  validateSalary: (salary: string) => void,
}

const GigFormContext = createContext<undefined | GigFormContextType>(undefined);

export default GigFormContext;
