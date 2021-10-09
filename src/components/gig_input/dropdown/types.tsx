import { ReactElement } from 'react';

export type Option = {
  displayName: string,
  icon?: ReactElement,
  onClick?: () => void,
}

export type GigDropdownProps = {
  classNames?: string,
  id: string,
  isDisabled?: boolean,
  onOptionSelect?: (option: Option) => void,
  options?: Option[] | undefined,
  selectedOption: Option | undefined,
  title: object | string
}
