import './index.scss';

import { ReactElement, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import GigLoader from 'components/gig_loader';
import { usePrevious } from 'hooks/usePrevious';
import { useAuth } from 'providers/auth';
import { useSearch } from 'providers/search';
import { useUser } from 'providers/user';
import AlertModal from 'routes/components/alert_modal';
import GigDetailsModal from 'routes/components/gig_details_modal';
import SearchItem from 'routes/components/search/item';
import settings from 'settings';
import { Gig } from 'types';

const SearchResults = (): ReactElement => {
  // context variables and functions
  const { user } = useAuth();
  const { filteredResults, searchResults } = useSearch();
  const { favoriteGigs, toggleFavoriteGig, updateActiveGig } = useUser();
  // local variables and functions
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isGigDetailsModalOpen, setIsGigDetailsModalOpen] = useState(false);
  const [resultsCount, setResultsCount] = useState(0);
  // hook variables
  const prevSearchResults = usePrevious(searchResults);

  useEffect(() => {
    if (!prevSearchResults && searchResults?.length) {
      setResultsCount(
        searchResults.length >= settings.MIN_RESULTS_PER_LOAD
          ? settings.MIN_RESULTS_PER_LOAD
          : searchResults.length
      );
    }
  }, [searchResults, prevSearchResults]);

  const handleToggleFavoriteGig = (gigId: string): void => {
    if (!user) {
      setIsAlertModalOpen(true);
      return;
    }
    toggleFavoriteGig(user.id, gigId);
  }

  const buildSearchResults = (): ReactElement[] => {
    const favoriteGigIds = favoriteGigs?.map(favoriteGig => favoriteGig.id);
    const results = filteredResults || searchResults;
    const visibleSearchResults = results.slice(0, resultsCount + 1);
    return visibleSearchResults?.map(
      searchResult => (
        <SearchItem
          key={`search-item-${searchResult.id}`}
          handleToggleFavoriteGig={() => handleToggleFavoriteGig(searchResult.id)}
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
      nextResultsCount <= searchResults.length
        ? nextResultsCount
        : searchResults.length
    );
  };

  const learnMoreAboutGig = (gigId: string): void => {
    const matchingGig = searchResults?.find(gig => gig.id === gigId);
    if (matchingGig) {
      updateActiveGig(matchingGig);
      setIsGigDetailsModalOpen(true);
    }
  }

  if (searchResults === undefined) {
    return (
      <div id='search-results'>
        <GigLoader color='#5BA1C5' type='cylon'/>
      </div>
    );
  }

  return (
    <div id='search-results'>
      <AlertModal
        isOpen={isAlertModalOpen}
        message='You must create an account or sign in in order to use this feature.'
        title='Feature Restricted To Users'
        setIsOpen={setIsAlertModalOpen}
      />
      <GigDetailsModal isOpen={isGigDetailsModalOpen} setIsOpen={setIsGigDetailsModalOpen} />
      {
        (!filteredResults && searchResults.length) || filteredResults?.length
          ? (
            <InfiniteScroll
              dataLength={resultsCount}
              next={getMoreSearchResults}
              hasMore={resultsCount !== searchResults.length}
              loader={<GigLoader color='#5BA1C5' height='5%' type='cylon'/>}
              scrollableTarget='search-results'
            >
              {buildSearchResults()}
            </InfiniteScroll>
          )
          : (
            <div id='no-search-results' className='header-text'>
              No gigs found matching this search
            </div>
          )
      }
    </div>
  );
}

export default SearchResults;
