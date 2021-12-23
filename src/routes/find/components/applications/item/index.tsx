import './index.scss';

import { ReactElement } from 'react';
import { BsStarFill } from 'react-icons/bs';

import GigButton from 'components/gig_button';
import { getStatusIcon } from 'libs/applications';
import { Gig, PopulatedApplication } from 'types';

type GigApplicationItemProps = {
  item: PopulatedApplication,
  learnMoreAboutGig: (gig: Gig) => void,
};

const GigApplicationItem = (props: GigApplicationItemProps): ReactElement => {
  const { gig, status } = props.item;
  const { city, employer, rating, state, title } = gig;

  return (
    <div className='gig-application-item'>
      <div className='thick header-text item-row'>{title}{getStatusIcon(status)}</div>
      <div className='item-row sub-header-text'>
        {employer}
        &nbsp;&nbsp;<div className='vertical-line dark-grey' />&nbsp;&nbsp;
        <BsStarFill className='gig-application-item-star' />&nbsp;
        {rating}
      </div>
      <div className='item-row sub-header-row sub-header-text'>
        {city}, {state}
      </div>
      <div className='item-row'>
        <GigButton
          classNames='learn-more-button primary-blue dark-background sub-header-text'
          onClick={() => props.learnMoreAboutGig(gig)}
          text='Learn More'
        />
      </div>
    </div>
  );
};

export default GigApplicationItem;
