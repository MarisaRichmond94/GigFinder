import './index.scss';

import { ReactElement } from 'react';
import { FaRegSnowflake } from 'react-icons/fa';
import { GiCampfire, GiExitDoor } from 'react-icons/gi';

import GigButton from 'components/gig_button';
import {
  calculateDurationSincePosted,
  getFormattedViews,
  populateJobRequirements,
} from 'libs/gigs';
import { useEmployer } from 'providers/employer';
import { Gig } from 'types';

type GigItemProps = {
  item: Gig,
  viewGigDetails: (gigId: string) => void,
};

const GigItem = (props: GigItemProps): ReactElement => {
  const { id, city, state, createdAt, requirements, title, views } = props.item;
  const { closeGig } = useEmployer();

  return (
    <div className='gig-item'>
      <div className='header-row'>
        <div className='gig-item-job-title bold header-text' title={title}>
          {title}
        </div>
        &nbsp;<div className='vertical-line' />&nbsp;
        {
          views > 5000
            ? <GiCampfire className='small-title-text' />
            : <FaRegSnowflake className='small-title-text'/>
        }&nbsp;
        <div className='gig-item-views sub-header-text' title={getFormattedViews(views)}>
          {getFormattedViews(views)}
        </div>
        <GigButton
          classNames='icon-button off-black'
          onClick={() => closeGig(id)}
          textBlock={
            <div className='close-gig-button' title='Close Gig'>
              <div>Close Gig</div>
              <GiExitDoor className='large-header-text' />
            </div>
          }
        />
      </div>
      <div className='body-row'>
        <div className='sub-header-text'>
          {city}, {state}
        </div>
        <div className='paragraph-text'>
          {populateJobRequirements(id, requirements)}
        </div>
        <div className='posted-row sub-header-text'>
          Posted {calculateDurationSincePosted(createdAt)} ago
        </div>
      </div>
      <div className='text-center'>
        <GigButton
          classNames='primary-blue dark-background sub-header-text'
          onClick={() => props.viewGigDetails(id)}
          text='View/Edit Details'
        />
      </div>
    </div>
  );
};

export default GigItem;
