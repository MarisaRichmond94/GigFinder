import { KeyboardEvent } from 'react';

export type SearchTextInputProps = {
  fieldName: string,
  id: string,
  placeholder: string,
  value: string,
  onKeyPress?: (e: KeyboardEvent) => void,
  updateInput: (type: string, value: string) => void
}
