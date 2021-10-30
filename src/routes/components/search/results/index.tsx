import './index.scss';

import { ReactElement } from 'react';

import SearchItem from '../item';
import { SearchResult, SearchResultsProps } from './types';
// TODO - Delete this once functionality is added
import mockSearchResults from './mock.json';

const SearchResults = (props: SearchResultsProps): ReactElement => {
  const buildSearchResults = (searchResults: Array<SearchResult>): Array<ReactElement> => {
    return searchResults.map(
      searchResult => <SearchItem item={searchResult} key={`search-item-${searchResult.id}`}/>
    );
  }

  return (
    <div id='search-results'>
      {buildSearchResults(mockSearchResults)}
    </div>
  );
}

export default SearchResults;
