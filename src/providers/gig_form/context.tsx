import { createContext } from 'react';

import { Gig, GigFormFieldType } from 'types';

interface GigFormContextType {
  benefitOptions: string[],
  benefits: string[],
  description?: string,
  location?: string,
  locationOptions?: string[],
  requirements?: string,
  salary?: string,
  title?: string,
  titleOptions?: string[],
  type?: string,
  typeOptions?: string[],
  isValidSalary: boolean,
  addBenefit: (benefit: string) => void,
  deleteBenefit: (benefit: string) => void,
  getIsValidInput: (type: GigFormFieldType) => boolean,
  resetForm: (originalGig?: Gig) => void,
  submitForm: (gig?: Gig, employer?: string) => Gig,
  updateInput: (type: GigFormFieldType, value: string | string[]) => void,
  validateSalary: (salary: string) => void,
}

const GigFormContext = createContext<undefined | GigFormContextType>(undefined);

export default GigFormContext;
