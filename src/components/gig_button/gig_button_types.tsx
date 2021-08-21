import { ReactElement } from 'react';

export type GigButtonProps = {
  classNames?: string,
  icon?: string,
  id: string,
  isDisabled?: boolean,
  onClick: (e: object) => void,
  style?: object,
  text?: string,
  textBlock?: ReactElement,
}
