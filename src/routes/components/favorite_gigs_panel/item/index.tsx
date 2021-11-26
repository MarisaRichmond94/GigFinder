import './index.scss';

import { ReactElement } from 'react';
import { BsStarFill } from 'react-icons/bs';
import { IoEllipsisVerticalSharp } from 'react-icons/io5';

import GigButton from 'components/gig_button';
import { Gig } from 'types';

type FavoriteGigItemProps = {
  item: Gig,
}

const FavoriteGigItem = (props: FavoriteGigItemProps): ReactElement => {
  const { id, city, company, rating, state, title } = props.item;

  return (
    <div className='favorite-gig-item'>
      <div className='thick header-text favorite-gig-item-row header'>
        <GigButton
          classNames='favorite-gig-menu-button'
          id={`favorite-gig-menu-button-${id}`}
          onClick={() => console.log('Open Menu')}
          textBlock={<IoEllipsisVerticalSharp />}
        />
        {title}
      </div>
      <div className='favorite-gig-item-row sub-header-text'>
        {company}
        &nbsp;&nbsp;<div className='vertical-line' />&nbsp;&nbsp;
        <BsStarFill className='favorite-gig-item-star' />&nbsp;
        {rating}
      </div>
      <div className='favorite-gig-item-row'>
        <div className='sub-header-row sub-header-text'>
          {city}, {state}
        </div>
      </div>
      <div className='favorite-gig-item-row footer'>
        <GigButton
          classNames='apply-now-button primary-blue-gig-button sub-header-text'
          id={`favorite-gig-apply-now-button-${id}`}
          onClick={() => console.log('Apply Now')}
          text='Apply Now'
        />
      </div>
    </div>
  )
}

export default FavoriteGigItem;
