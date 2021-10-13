import { ReactElement } from 'react';

export type SearchDropdownInputProps = {
  fieldName: string,
  options?: Array<Option>,
  title: string,
  value: Option,
  updateInput: (type: string, value: Option) => void
}

export interface Option {
  displayName: string,
  icon?: ReactElement,
  onClick?: () => void,
}