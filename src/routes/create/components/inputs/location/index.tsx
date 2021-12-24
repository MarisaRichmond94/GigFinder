import { ReactElement } from 'react';

import ControlledSearchableGigInput from 'components/gig_input/searchable/controlled';
import { useGigForm } from 'providers/gig_form';
import { GigFormFieldType } from 'types';

const LocationInput = (): ReactElement => {
  const { location, locationOptions, updateInput } = useGigForm();

  return (
    <div className='detail-row-container'>
      <div className='bold sub-header-text gig-detail-title'>
        Location
      </div>
      <ControlledSearchableGigInput
        classNames='gig-details-input off-white'
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
