import { useCallback, useEffect, useState } from 'react';

import BenefitsApi from 'api/benefits';
import GigsApi from 'api/gigs';
import LocationsApi from 'api/locations';
import TypesApi from 'api/types';
import TitlesApi from 'api/titles';
import GigFormContext from 'providers/gig_form/context';
import { Gig, GigFormFieldType } from 'types';
import generateGUID from 'utils/generateGUID';

const GigFormProvider = (props: object) => {
  // general state
  const [benefitOptions, setBenefitOptions] = useState<string[] | undefined>();
  const [locationOptions, setLocationOptions] = useState<string[] | undefined>();
  const [titleOptions, setTitleOptions] = useState<string[] | undefined>();
  const [typeOptions, setTypeOptions] = useState<string[] | undefined>();
  const [isInEditMode, setIsInEditMode] = useState(false);
  const [isValidSalary, setIsValidSalary] = useState(false);
  // gig field state
  const [benefits, setBenefits] = useState<string[]>([]);
  const [description, setDescription] = useState<string | undefined>();
  const [location, setLocation] = useState<string | undefined>();
  const [requirements, setRequirements] = useState<string | undefined>();
  const [salary, setSalary] = useState<string | undefined>();
  const [title, setTitle] = useState<string | undefined>();
  const [type, setType] = useState<string | undefined>();

  useEffect(() => {
    async function populateFormOptions() {
      // benefits
      const benefitOptionsResponse = await BenefitsApi.get();
      setBenefitOptions(benefitOptionsResponse);
      // locations
      const locationOptionsResponse = await LocationsApi.get();
      setLocationOptions(locationOptionsResponse);
      // titles
      const titleOptionsResponse = await TitlesApi.get();
      setTitleOptions(titleOptionsResponse);
      // types
      const typeOptionsResponse = await TypesApi.get();
      setTypeOptions(typeOptionsResponse);
    }

    populateFormOptions();
    // eslint-disable-next-line
  }, []);

  const addBenefit = useCallback((benefit: string): void => {
    setBenefits([...benefits, benefit]);
  }, [benefits]);

  const deleteBenefit = useCallback((benefit: string): void => {
    setBenefits(benefits.filter(b => b !== benefit));
  }, [benefits]);

  const submitForm = useCallback((gig?: Gig, employer?: string): Gig => {
    if (isInEditMode && gig) {
      // update existing gig
      const updatedGig = {
        ...gig,
        benefits,
        description,
        requirements,
        salary,
        type,
      };

      if (JSON.stringify(updatedGig) !== JSON.stringify(gig)) {
        // @ts-ignore
        GigsApi.update(updatedGig.id, updatedGig);
      }

      // @ts-ignore
      return updatedGig;
    } else {
      // create new gig
      const newGig = {
        id: generateGUID(),
        employer,
        city: location,
        state: 'California',
        abbrevState: 'CA',
        rating: 0,
        createdAt: new Date().toISOString(),
        views: 0,
        description,
        requirements,
        benefits,
        title,
        type,
        salary,
      };
      // @ts-ignore
      GigsApi.post(newGig);
      // @ts-ignore
      return newGig;
    }
  }, [benefits, description, isInEditMode, location, requirements, salary, title, type]);

  const resetForm = useCallback((originalGig?: Gig): void => {
    if (originalGig) {
      // reset values back to original gig values (for editing existing gig)
      setBenefits(originalGig.benefits);
      setDescription(originalGig.description);
      setRequirements(originalGig.requirements);
      setSalary(originalGig.salary);
      setType(typeOptions?.find(jobType => jobType === originalGig.type));
      setIsValidSalary(true);
    } else {
      // clear all values to undefined/falsey (for creating new gig)
      setBenefits([]);
      setDescription(undefined);
      setLocation(undefined);
      setRequirements(undefined);
      setSalary(undefined);
      setTitle(undefined);
      setType(undefined);
      setIsValidSalary(false);
    }
    setIsInEditMode(!!originalGig);
  }, [typeOptions]);

  const updateInput = useCallback((type: string, value: string | string[]): void => {
    switch (type) {
      case GigFormFieldType.benefits:
        if (Array.isArray(value)) setBenefits(value);
        break;
      case GigFormFieldType.description:
        if (typeof value === 'string') setDescription(value);
        break;
      case GigFormFieldType.location:
        if (typeof value === 'string') setLocation(value);
        break;
      case GigFormFieldType.requirements:
        if (typeof value === 'string') setRequirements(value);
        break;
      case GigFormFieldType.salary:
        if (typeof value === 'string') setSalary(value);
        break;
      case GigFormFieldType.title:
        if (typeof value === 'string') setTitle(value);
        break;
      case GigFormFieldType.type:
        if (typeof value === 'string') setType(value);
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

  const getIsValidInput = (type: GigFormFieldType): boolean => {
    switch (type) {
      case GigFormFieldType.salary:
        return isValidSalary;
      case GigFormFieldType.all:
        return isInEditMode
          ? isValidSalary && !!type
          : (
            isValidSalary &&
            locationOptions.find(option => option === location) &&
            titleOptions.find(option => option === title) &&
            !!type && !!description && !!requirements
          );
      default:
        return false;
    }
  };

  const value = {
    benefitOptions,
    benefits,
    description,
    location,
    locationOptions,
    requirements,
    salary,
    title,
    titleOptions,
    type,
    typeOptions,
    isValidSalary,
    addBenefit,
    deleteBenefit,
    getIsValidInput,
    resetForm,
    submitForm,
    updateInput,
    validateSalary,
  };

  return <GigFormContext.Provider value={value} {...props} />;
};

export default GigFormProvider;
