import './index.scss';

import { ReactElement, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import noResultsIcon from 'assets/icons/results.svg';
import GigLoader from 'components/gig_loader';
import { usePrevious } from 'hooks/usePrevious';
import buildNoPanelContent from 'libs/no_panel_content';
import { useApp } from 'providers/app';
import { useAuth } from 'providers/auth';
import { useFavorites } from 'providers/favorites';
import { useSearch } from 'providers/search';
import { useUser } from 'providers/user';
import SearchItem from 'routes/components/search/item';
import AlertModal from 'routes/find/components/alert_modal';
import GigDetailsModal from 'routes/find/components/gig_details_modal';
import settings from 'settings';
import { Gig } from 'types';

type SearchResultsProps = {
  isCenterPanel?: boolean,
  unusableHeight?: number,
};

const SearchResults = (props: SearchResultsProps): ReactElement => {
  // context variables and functions
  const { calculateTotalHeight } = useApp();
  const { user } = useAuth();
  const { results } = useSearch();
  const { favoriteGigs, toggleFavoriteGig } = useFavorites();
  const { updateActiveGig } = useUser();
  // local variables and functions
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isGigDetailsModalOpen, setIsGigDetailsModalOpen] = useState(false);
  const [resultsCount, setResultsCount] = useState(0);
  // hook variables
  const prevResults = usePrevious(results);
  // derived variables
  const listStyling = props.unusableHeight
    ? { height: `calc(100vh - ${props.unusableHeight}px)`}
    : {};

  useEffect(() => {
    setTimeout(() => { calculateTotalHeight(); }, 500);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!prevResults && results?.length) {
      setResultsCount(
        results.length >= settings.MIN_RESULTS_PER_LOAD
          ? settings.MIN_RESULTS_PER_LOAD
          : results.length
      );
    }
  }, [results, prevResults]);

  const handleToggleFavoriteGig = (gig: Gig): void => {
    if (!user) {
      setIsAlertModalOpen(true);
      return;
    }
    toggleFavoriteGig(user.id, gig);
  }

  const buildSearchResults = (): ReactElement[] => {
    const favoriteGigIds = favoriteGigs?.map(favoriteGig => favoriteGig.id);
    const visibleSearchResults = results.slice(0, resultsCount + 1);
    return visibleSearchResults?.map(
      searchResult => (
        <SearchItem
          key={`search-item-${searchResult.id}`}
          handleToggleFavoriteGig={() => handleToggleFavoriteGig(searchResult)}
          item={searchResult}
          isFavorite={favoriteGigIds?.includes(searchResult.id) || false}
          learnMoreAboutGig={learnMoreAboutGig}
        />
      )
    );
  };

  const getMoreSearchResults = (): void => {
    const nextResultsCount = resultsCount + settings.MIN_RESULTS_PER_LOAD;
    setResultsCount(
      nextResultsCount <= results.length
        ? nextResultsCount
        : results.length
    );
  };

  const learnMoreAboutGig = (gigId: string): void => {
    const matchingGig = results?.find(gig => gig.id === gigId);
    if (matchingGig) {
      updateActiveGig(matchingGig);
      setIsGigDetailsModalOpen(true);
    }
  }

  if (results === undefined) {
    return (
      <div id='search-results'>
        <GigLoader color='#5BA1C5' type='cylon'/>
      </div>
    );
  }

  return (
    <div id='search-results' style={listStyling}>
      <AlertModal
        isOpen={isAlertModalOpen}
        message='You must create an account or sign in in order to use this feature.'
        title='Feature Restricted To Users'
        setIsOpen={setIsAlertModalOpen}
      />
      <GigDetailsModal isOpen={isGigDetailsModalOpen} setIsOpen={setIsGigDetailsModalOpen} />
      {
        results?.length
          ? (
            <InfiniteScroll
              dataLength={resultsCount}
              next={getMoreSearchResults}
              hasMore={resultsCount !== results.length}
              loader={<GigLoader color='#5BA1C5' height='5%' type='cylon'/>}
              scrollableTarget='search-results'
            >
              {buildSearchResults()}
            </InfiniteScroll>
          )
          : buildNoPanelContent(
            'No gigs found matching this search',
            noResultsIcon,
            props.isCenterPanel,
          )
      }
    </div>
  );
}

export default SearchResults;
