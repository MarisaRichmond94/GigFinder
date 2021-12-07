import './index.scss';

import { ReactElement } from 'react';

import ControlledSearchableGigInput from 'components/gig_input/searchable/controlled';
import { useGigForm } from 'providers/gig_form';
import { GigFormFieldType } from 'types';

const LocationInput = (): ReactElement => {
  const { location, locationOptions, updateInput } = useGigForm();

  return (
    <div className='detail-row-flex-container'>
      <ControlledSearchableGigInput
        classNames='off-white-text-input gig-details-location-input'
        formValue={location || ''}
        id='gig-location-searchable-input'
        onChange={updatedLocation => updateInput(GigFormFieldType.location, updatedLocation)}
        onOptionSelect={updatedLocation => updateInput(GigFormFieldType.location, updatedLocation)}
        options={locationOptions}
        placeholder='Select city in the state of California'
      />
    </div>
  );
};

export default LocationInput;
