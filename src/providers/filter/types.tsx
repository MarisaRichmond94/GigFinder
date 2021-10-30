export interface FilterContextType {
  filters: Array<string>,
  deleteFilter: (filter: string) => void,
  onKeyPress: (e: any) => void,
}
