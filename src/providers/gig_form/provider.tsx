import { useCallback, useEffect, useState } from 'react';

import { getBenefits } from 'api/benefits';
import { updateGig } from 'api/gigs';
import { getGigTypes } from 'api/gig_types';
import GigFormContext from 'providers/gig_form/context';
import { Gig, GigFormFieldType, GigType } from 'types';

const GigFormProvider = (props: object) => {
  const [benefits, setBenefits] = useState<string[]>([]);
  const [benefitOptions, setBenefitOptions] = useState<string[] | undefined>();
  const [description, setDescription] = useState<string | undefined>();
  const [gigTypes, setGigTypes] = useState<GigType[] | undefined>();
  const [requirements, setRequirements] = useState<string | undefined>();
  const [salary, setSalary] = useState<string | undefined>();
  const [type, setType] = useState<GigType | undefined>();
  const [isValidSalary, setIsValidSalary] = useState(true);

  useEffect(() => {
    async function populateGigTypes() {
      const gigTypesResponse = await getGigTypes();
      setGigTypes(gigTypesResponse);
    }

    async function populateBenefitOptions() {
      const benefitOptionsResponse = await getBenefits();
      setBenefitOptions(benefitOptionsResponse);
    }

    populateGigTypes();
    populateBenefitOptions();
    // eslint-disable-next-line
  }, []);

  const addBenefit = useCallback((benefit: string): void => {
    setBenefits([...benefits, benefit]);
  }, [benefits]);

  const deleteBenefit = useCallback((benefit: string): void => {
    setBenefits(benefits.filter(b => b !== benefit));
  }, [benefits]);

  const submitForm = useCallback((gig: Gig): Gig => {
    const updatedGig = {
      ...gig,
      benefits,
      description,
      requirements,
      salary,
      type: type.displayName,
    };

    if (JSON.stringify(updatedGig) !== JSON.stringify(gig)) {
      // @ts-ignore
      updateGig(updatedGig);
    }

    // @ts-ignore
    return updatedGig;
  }, [benefits, description, requirements, salary, type]);

  const resetForm = useCallback((gig: Gig): void => {
    setSalary(gig.salary);
    setType(gigTypes?.find(jobType => jobType.displayName === gig.type));
    setBenefits(gig.benefits);
    setDescription(gig.description);
    setRequirements(gig.requirements);
    setIsValidSalary(true);
  }, [gigTypes]);

  const updateInput = useCallback((type: string, value: string | string[] | GigType): void => {
    switch (type) {
      case GigFormFieldType.benefits:
        if (Array.isArray(value)) setBenefits(value);
        break;
      case GigFormFieldType.description:
        if (typeof value === 'string') setDescription(value);
        break;
      case GigFormFieldType.requirements:
        if (typeof value === 'string') setRequirements(value);
        break;
      case GigFormFieldType.salary:
        if (typeof value === 'string') setSalary(value);
        break;
      case GigFormFieldType.type:
        if (typeof value === 'object' && !Array.isArray(value)) setType(value);
        break;
      default:
        // TODO - handle this
        break;
    }
  }, []);

  const validateSalary = useCallback((salary: string): void => {
    let isValid = false;

    const startsWith$ = salary.startsWith('$');
    const includesDecimal = salary.includes('.');
    let dollars = salary;
    let cents;
    if (includesDecimal) {
      [dollars, cents] = salary.split('.');
    }
    dollars = dollars.substring(1);
    const containsTwoDecimalPlaces = cents?.length === 2;
    const regExp = /[a-zA-Z,]/g;
    if (
      startsWith$ && includesDecimal && containsTwoDecimalPlaces &&
      !regExp.test(dollars) && !regExp.test(cents)
    ) {
      isValid = true;
    }

    setIsValidSalary(isValid);
  }, []);

  const value = {
    benefitOptions,
    benefits,
    description,
    gigTypes,
    requirements,
    salary,
    type,
    isValidSalary,
    addBenefit,
    deleteBenefit,
    resetForm,
    submitForm,
    updateInput,
    validateSalary,
  };

  return <GigFormContext.Provider value={value} {...props} />;
};

export default GigFormProvider;
