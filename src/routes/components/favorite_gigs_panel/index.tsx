import './index.scss';

import { ReactElement } from 'react';
import { BsHeartFill } from 'react-icons/bs';


import { useUser } from 'providers/user';
import FavoriteGigItem from 'routes/components/favorite_gigs_panel/item';

const FavoriteGigsPanel = (): ReactElement => {
  const { favoriteGigs } = useUser();

  if (!favoriteGigs) {
    return null;
  }

  return (
    <div id='favorite-gigs-panel'>
      <div className='thick-header-text' id='favorite-gigs-panel-header'>
        <BsHeartFill />&nbsp;
        Favorite Gigs
      </div>
      <hr id='favorite-gigs-panel-divider'/>
      <div id='favorite-gigs-list'>
        {
          favoriteGigs.map(favoriteGig => {
            return (
              <FavoriteGigItem
                key={`favorite-gig-item-${favoriteGig.id}`}
                item={favoriteGig}
              />
            )
          })
        }
      </div>
    </div>
  );
}

export default FavoriteGigsPanel;
