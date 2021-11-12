import { ReactElement } from 'react';

export type SearchDropdownInputProps = {
  fieldName: string,
  options?: Option[],
  placeholder: string,
  selectedOption?: Option,
  updateInput: (key: string, value: Option) => void,
}

export interface Option {
  displayName: string,
  icon?: ReactElement,
  onClick?: () => void,
}