import './index.scss';

import { ReactElement } from 'react';
import { BsStarFill } from 'react-icons/bs';
import { AiOutlineDelete } from 'react-icons/ai';

import GigButton from 'components/gig_button';
import { Gig } from 'types';

type FavoriteGigItemProps = {
  isApplyDisabled: boolean,
  item: Gig,
  apply: (gig: Gig) => void,
  unfavoriteGig: (gig: Gig) => void,
}

const FavoriteGigItem = (props: FavoriteGigItemProps): ReactElement => {
  const { id, city, employer, rating, state, title } = props.item;

  return (
    <div className='favorite-gig-item'>
      <div className='thick header-text favorite-gig-item-row header'>
        {title}
        <GigButton
          classNames='remove-favorite-gig-button'
          id={`favorite-gig-menu-button-${id}`}
          onClick={props.unfavoriteGig}
          textBlock={<AiOutlineDelete />}
        />
      </div>
      <div className='favorite-gig-item-row sub-header-text'>
        {employer}
        &nbsp;&nbsp;<div className='vertical-line dark-grey' />&nbsp;&nbsp;
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
          classNames='apply-now-button primary-blue dark-background sub-header-text'
          id={`favorite-gig-apply-now-button-${id}`}
          isDisabled={props.isApplyDisabled}
          onClick={props.apply}
          text='Apply Now'
        />
      </div>
    </div>
  )
}

export default FavoriteGigItem;
