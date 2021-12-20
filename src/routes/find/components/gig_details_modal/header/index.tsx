import './index.scss';

import { ReactElement } from 'react';
import { BsHeart, BsHeartFill, BsStarFill } from 'react-icons/bs';

import GigButton from 'components/gig_button';
import { useAuth } from 'providers/auth';
import { useUser } from 'providers/user';
import { Gig } from 'types';

type HeaderProps = {
  gig?: Gig,
}

const Header = (props: HeaderProps): ReactElement => {
  // context variables and functions
  const { user } = useAuth();
  const { favoriteGigs, toggleFavoriteGig } = useUser();
  // destructured prop variables
  if (!props.gig) return null;
  const { id, city, employer, rating, state, title } = props.gig;
  // derived variables
  const isFavorite = !!favoriteGigs?.find(gig => gig.id === id);

  const handleToggleFavoriteGig = (): void => {
    if (!user) return;
    toggleFavoriteGig(user.id, id);
  }

  return (
    <div id='gig-details-modal-header' className='find'>
      <div id='primary-header'>
        <div id='gig-details-title' className='bold header-text' title={title}>
          {title}
        </div>
        &nbsp;<div className='vertical-line grey' />&nbsp;
        <div id='gig-details-employer' className='header-text' title={employer}>
          {employer}
        </div>
        &nbsp;<BsStarFill id='gig-details-star-icon' />&nbsp;
        <div className='header-text'>
          {rating}
        </div>
        <div id='favorite-gig-button-container' className='icon-button'>
          <GigButton
            classNames='favorite-gig-button icon-button off-black'
            id={`favorite-gig-button-${id}`}
            onClick={handleToggleFavoriteGig}
            textBlock={
              isFavorite
                ? <BsHeartFill className='favorite-gig-button-icon primary-red icon-button' />
                : <BsHeart className='favorite-gig-button-icon' />
            }
          />
        </div>
      </div>
      <div className='header-text' id='sub-header'>
        {city}, {state}
      </div>
    </div>
  );
}

export default Header;
