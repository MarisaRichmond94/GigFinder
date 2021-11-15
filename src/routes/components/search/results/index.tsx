import './index.scss';

import { ReactElement, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import GigLoader from 'components/gig_loader';
import { usePrevious } from 'hooks/usePrevious';
import { useSearch } from 'providers/search';
import SearchItem from 'routes/components/search/item';
import settings from 'settings';

const SearchResults = (): ReactElement => {
  const { searchResults } = useSearch();
  const [resultsCount, setResultsCount] = useState(0);
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
  }, [searchResults, prevSearchResults])

  const buildSearchResults = (): ReactElement[] => {
    const visibleSearchResults = searchResults.slice(0, resultsCount + 1);
    return visibleSearchResults?.map(
      searchResult => <SearchItem item={searchResult} key={`search-item-${searchResult.id}`}/>
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
      {
        searchResults.length
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
