import './index.scss';

import { ReactElement } from 'react';

import { useSearch } from 'providers/search';
import SearchItem from 'routes/components/search/item';
import { SearchResult } from 'types';

const SearchResults = (): ReactElement => {
  const { searchResults } = useSearch();

  const buildSearchResults = (searchResults: SearchResult[]): ReactElement[] => {
    return searchResults?.map(
      searchResult => <SearchItem item={searchResult} key={`search-item-${searchResult.id}`}/>
    );
  }

  return (
    <div id='search-results'>
      {searchResults && buildSearchResults(searchResults)}
    </div>
  );
}

export default SearchResults;
