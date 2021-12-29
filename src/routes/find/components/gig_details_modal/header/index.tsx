import './index.scss';

import { ReactElement } from 'react';
import { BsHeart, BsHeartFill, BsStarFill } from 'react-icons/bs';

import GigButton from 'components/gig_button';
import { useAuth } from 'providers/auth';
import { useFavorites } from 'providers/favorites';
import { Gig } from 'types';

type HeaderProps = {
  gig?: Gig,
};

const Header = (props: HeaderProps): ReactElement => {
  // context variables and functions
  const { user, isLoggedIn } = useAuth();
  const { favoriteGigs, toggleFavoriteGig } = useFavorites();
  // destructured prop variables
  if (!props.gig) return null;
  const { id, city, employer, rating, state, title } = props.gig;
  // derived variables
  const isFavorite = !!favoriteGigs?.find(gig => gig.id === id);

  const handleToggleFavoriteGig = (): void => {
    if (!user) return;
    toggleFavoriteGig(user.id, props.gig);
  };

  return (
    <div id='find-gig-details-modal-header'>
      <div id='primary-header'>
        <div id='gig-details-title' className='bold header-text' title={title}>{title}</div>
        &nbsp;<div className='vertical-line grey' />&nbsp;
        <div id='gig-details-employer' className='header-text' title={employer}>{employer}</div>
        &nbsp;<BsStarFill id='gig-details-star-icon' className='header-text' />&nbsp;
        <div className='header-text'>{rating}</div>
        <div id='favorite-gig-button-container' className='header-text icon-button'>
          <GigButton
            classNames={
              `favorite-gig-button icon-button ${isFavorite ? 'primary-red' : 'off-black'}`
            }
            isDisabled={!isLoggedIn}
            onClick={handleToggleFavoriteGig}
            textBlock={
              isFavorite
                ? <BsHeartFill className='favorite-gig-button-icon' />
                : <BsHeart className='favorite-gig-button-icon' />
            }
          />
        </div>
      </div>
      <div className='header-text' id='sub-header'>{city}, {state}</div>
    </div>
  );
};

export default Header;
