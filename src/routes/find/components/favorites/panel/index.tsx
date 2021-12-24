import './index.scss';

import { ReactElement, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import noResultsIcon from 'assets/icons/favorites.svg';
import GigLoader from 'components/gig_loader';
import { usePrevious } from 'hooks/usePrevious';
import buildNoPanelContent from 'libs/no_panel_content';
import { useAuth } from 'providers/auth';
import { useFavorites } from 'providers/favorites';
import { useUser } from 'providers/user';
import ActiveResume from 'routes/find/components/active_resume';
import FavoriteGigItem from 'routes/find/components/favorites/item';
import settings from 'settings';
import { Gig } from 'types';

type FavoriteGigsPanelProps = {
  isCenterPanel?: boolean,
  showActiveResumeSelector?: boolean,
  unusableHeight?: number,
}

const FavoriteGigsPanel = (props: FavoriteGigsPanelProps): ReactElement => {
  const { isLoggedIn, user } = useAuth();
  const { favoriteGigs, toggleFavoriteGig } = useFavorites();
  const { activeResumeId, applications, applyToGig } = useUser();
  const [resultsCount, setResultsCount] = useState(0);
  const prevFavoriteGigs = usePrevious(favoriteGigs);
  const listStyling = props.unusableHeight
    ? { maxHeight: `calc(100vh - ${props.unusableHeight}px)`}
    : {};

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
          apply={() => apply(favoriteGig)}
          key={`favorite-gig-item-${favoriteGig.id}`}
          isApplyDisabled={
            !!(!activeResumeId || applications.find(gigApp => gigApp.gig.id === favoriteGig.id))
          }
          item={favoriteGig}
          unfavoriteGig={() => unfavoriteGig(favoriteGig)}
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

  const apply = (gig: Gig): void => {
    applyToGig(gig);
  };

  const unfavoriteGig = (gig: Gig): void => {
    toggleFavoriteGig(user.id, gig);
  };

  return (
    <div id='favorite-gigs-panel'>
      {
        isLoggedIn && props.showActiveResumeSelector &&
        <>
          <ActiveResume isDisplayHeader />
          <hr className='panel-divider' />
        </>
      }
      {
        favoriteGigs?.length
          ? (
            <div id='favorite-gigs-list' style={listStyling}>
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
          : isLoggedIn
            ? buildNoPanelContent(
              `No favorite gigs to display. Consider adding to gigs to your favorites to
              make your application process faster and easier`,
              noResultsIcon,
              props.isCenterPanel,
            )
            : buildNoPanelContent(
              `Create an account or sign in to add favorite gigs and make the application
              process faster and easier`,
              noResultsIcon,
              props.isCenterPanel,
            )
      }
    </div>
  );
}

export default FavoriteGigsPanel;
