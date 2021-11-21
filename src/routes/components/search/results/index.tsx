import './index.scss';

import { ReactElement, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import GigLoader from 'components/gig_loader';
import { usePrevious } from 'hooks/usePrevious';
import { useAuth } from 'providers/auth';
import { useSearch } from 'providers/search';
import { useUser } from 'providers/user';
import AlertModal from 'routes/components/alert_modal';
import SearchItem from 'routes/components/search/item';
import settings from 'settings';

const SearchResults = (): ReactElement => {
  const { user } = useAuth();
  const { filteredResults, searchResults } = useSearch();
  const { favoriteGigs, toggleFavoriteGig } = useUser();
  const [resultsCount, setResultsCount] = useState(0);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const prevSearchResults = usePrevious(searchResults);

  useEffect(() => {
    if (!prevSearchResults && searchResults?.length) {
      setResultsCount(
        searchResults.length >= settings.MIN_RESULTS_PER_LOAD
          ? settings.MIN_RESULTS_PER_LOAD
          : searchResults.length
      );
    }
    // eslint-disable-next-line
  }, [searchResults, prevSearchResults]);

  const handleToggleFavoriteGig = (gigId: string): void => {
    if (!user) {
      setIsAlertModalOpen(true);
      return;
    }
    toggleFavoriteGig(user.id, gigId);
  }

  const buildSearchResults = (): ReactElement[] => {
    const results = filteredResults || searchResults;
    const visibleSearchResults = results.slice(0, resultsCount + 1);
    return visibleSearchResults?.map(
      searchResult => (
        <SearchItem
          key={`search-item-${searchResult.id}`}
          handleToggleFavoriteGig={() => handleToggleFavoriteGig(searchResult.id)}
          item={searchResult}
          isFavorite={favoriteGigs?.includes(searchResult.id) || false}
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
