import './index.scss';

import { ReactElement } from 'react';
import { BsHeart, BsHeartFill, BsStarFill } from 'react-icons/bs';

import GigButton from 'components/gig_button';

type SearchItemHeaderProps = {
  company: string,
  handleToggleFavoriteGig: () => void,
  id: string,
  isFavorite: boolean,
  rating: number,
  title: string,
}

const SearchItemHeader = (props: SearchItemHeaderProps): ReactElement => {
  const { id, isFavorite, company, rating, title } = props;

  return (
    <div className='header-row'>
      <div className='gig-item-job-title bold header-text' title={title}>
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
        classNames='favorite-gig-button icon-button off-black'
        id={`favorite-gig-button-${id}`}
        onClick={() => props.handleToggleFavoriteGig()}
        textBlock={
          isFavorite
            ? <BsHeartFill className='favorite-gig-button-icon red-icon' />
            : <BsHeart className='favorite-gig-button-icon' />
        }
      />
    </div>
  );
}

export default SearchItemHeader;
