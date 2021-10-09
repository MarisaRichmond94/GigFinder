import { KeyboardEvent, ReactElement } from 'react';

export interface Option {
  displayName: string,
  icon?: ReactElement,
  onClick?: () => void,
}

export interface SearchFormContextType {
  title: string,
  type?: undefined | Option,
  location: string,
  onFormSubmit: () => void,
  onKeyPress: (e: KeyboardEvent) => void,
  updateInput: (type: string, value: string | Option) => void
}
