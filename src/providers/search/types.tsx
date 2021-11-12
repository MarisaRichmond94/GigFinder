export interface SearchResult {
  abbrev_state: string,
  benefits: string,
  city: string,
  company: string,
  created_at: string,
  description: string,
  id: string,
  rating: number,
  requirements: string,
  salary: string,
  state: string,
  title: string,
  type: string,
  views: number,
}

export interface SearchContextType {
  searchFilters: string[],
  searchResults?: SearchResult[],
  debounceUpdateSearch: (key: string, value: string) => void,
  deleteSearchFilter: (filter: string) => void,
  onFilterKeyPress: (e: any) => void,
  onSearchFormSubmit: () => void,
}
