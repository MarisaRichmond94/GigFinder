export type SearchTextInputProps = {
  fieldName: string,
  id: string,
  placeholder: string,
  updateSearchText: (key: string, value: string) => void,
  value: string,
}
