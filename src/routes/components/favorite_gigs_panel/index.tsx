import './index.scss';

import { ReactElement, useEffect, useState } from 'react';
import { BsHeartFill } from 'react-icons/bs';
import InfiniteScroll from 'react-infinite-scroll-component';

import GigLoader from 'components/gig_loader';
import { usePrevious } from 'hooks/usePrevious';
import { useAuth } from 'providers/auth';
import { useUser } from 'providers/user';
import FavoriteGigItem from 'routes/components/favorite_gigs_panel/item';
import settings from 'settings';

const FavoriteGigsPanel = (): ReactElement => {
  const { isLoggedIn } = useAuth();
  const { favoriteGigs } = useUser();
  const [resultsCount, setResultsCount] = useState(0);
  const prevFavoriteGigs = usePrevious(favoriteGigs);

  useEffect(() => {
    if (!prevFavoriteGigs && favoriteGigs?.length) {
      setResultsCount(
        favoriteGigs.length >= settings.MIN_RESULTS_PER_LOAD
          ? settings.MIN_RESULTS_PER_LOAD
          : favoriteGigs.length
      );
    }
    // eslint-disable-next-line
  }, [favoriteGigs, prevFavoriteGigs]);

  const buildFavoriteGigs = (): ReactElement[] => {
    return favoriteGigs.map(favoriteGig => {
      return (
        <FavoriteGigItem
          key={`favorite-gig-item-${favoriteGig.id}`}
          item={favoriteGig}
        />
      )
    });
  }

  const getMoreFavoriteGigs = (): void => {
    const nextResultsCount = resultsCount + settings.MIN_RESULTS_PER_LOAD;
    setResultsCount(
      nextResultsCount <= favoriteGigs.length
        ? nextResultsCount
        : favoriteGigs.length
    );
  };

  return (
    <div id='favorite-gigs-panel'>
      <div className='thick-header-text' id='favorite-gigs-panel-header'>
        <BsHeartFill />&nbsp;
        Favorite Gigs
      </div>
      <hr id='favorite-gigs-panel-divider'/>
      {
        favoriteGigs?.length
          ? (
            <div id='favorite-gigs-list'>
              <InfiniteScroll
                dataLength={resultsCount}
                next={getMoreFavoriteGigs}
                hasMore={resultsCount !== favoriteGigs.length}
                loader={<GigLoader color='#5BA1C5' height='5%' type='cylon'/>}
                scrollableTarget='favorite-gigs-list'
              >
                {buildFavoriteGigs()}
              </InfiniteScroll>
            </div>
          )
          : (
            <div className='sub-header-text' id='no-favorite-gigs-message'>
              {
                isLoggedIn
                  ? (
                    `No favorite gigs to display. Consider adding to gigs to your favorites to
                    make your application process faster and easier`
                  )
                  : (
                    `Create an account or sign in to add favorite gigs and make the application
                    process faster and easier`
                  )
              }
            </div>
          )
      }
    </div>
  );
}

export default FavoriteGigsPanel;
