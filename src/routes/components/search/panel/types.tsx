import { ReactElement } from 'react';

export interface Option {
  displayName: string,
  icon?: ReactElement,
  onClick?: () => void,
}