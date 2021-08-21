import { KeyboardEvent } from 'react';

export type SearchTextInputProps = {
  fieldName: string,
  value: string,
  onKeyPress?: (e: KeyboardEvent) => void,
  updateInput: (type: string, value: string) => void
}
