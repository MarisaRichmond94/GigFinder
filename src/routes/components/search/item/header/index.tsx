import './index.scss';

import { ReactElement } from 'react';
import { BsHeart, BsHeartFill, BsStarFill } from 'react-icons/bs';

import { SearchItemHeaderProps } from './types';

import GigButton from 'components/gig_button';

const SearchItemHeader = (props: SearchItemHeaderProps): ReactElement => {
  const { id, company, rating, title } = props;

  const getFavoriteGigButton = (): ReactElement => {
    // TODO - dynamically determine button based on user favorites
    const randomInt = Math.floor(Math.random() * (10 - 1)) + 1;
    const isFavorite = randomInt % 2 === 0;

    return (
      <div className='favorite-gig-button-wrapper'>
        <div className='sub-header-text'>
          {isFavorite ? 'Favorite Gig' : 'Add Gig To Favorites'}
        </div>&nbsp;&nbsp;
        {
          isFavorite
            ? <BsHeartFill className='favorite-gig-button-icon red-icon' />
            : <BsHeart className='favorite-gig-button-icon' />
        }
      </div>
    );
  }

  return (
    <div className='header-row'>
      <div className='gig-item-job-title bold-header-text' title={title}>
        {title}
      </div>
      &nbsp;&nbsp;<div className='vertical-line' />&nbsp;&nbsp;
      <div className='gig-item-company sub-header-text' title={company}>
        {company}
      </div>&nbsp;&nbsp;
      <BsStarFill className='search-item-star' />&nbsp;
      <div className='gig-item-rating sub-header-text' title={rating.toString()}>
        {rating}
      </div>
      <GigButton
        classNames='favorite-gig-button text-button'
        id={`favorite-gig-button-${id}`}
        onClick={() => console.log('Favorite this gig!')}
        textBlock={getFavoriteGigButton()}
      />
    </div>
  );
}

export default SearchItemHeader;
