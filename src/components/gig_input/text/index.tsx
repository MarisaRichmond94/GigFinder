import './index.scss';

import { ReactElement, useState } from 'react';

type GigTextInputProps = {
  classNames?: string,
  clearKey?: string,
  formValue?: string,
  id: string,
  onKeyPress?: (e: object) => void,
  placeholder: string,
  setFormValue?: (input: string) => void,
  type?: string,
  validateFormValue?: (input: string) => void
}

const GigTextInput = (props: GigTextInputProps): ReactElement => {
  const [value, setValue] = useState<string>('');

  const onChange = (input: string): void => {
    if (props.setFormValue) {
      props.setFormValue(input);

      if (props.validateFormValue) {
        props.validateFormValue(input);
      }
    } else {
      setValue(input);
    }
  }

  const onKeyPress = (e: any): void => {
    if (props.onKeyPress) {
      props.onKeyPress(e);

      if (props.clearKey && e.key === props.clearKey) {
        setValue('');
      }
    }
  }

  return (
    <input
      autoComplete='none'
      className={`gig-form-input sub-header-text ${props.classNames}`}
      id={props.id}
      name={Math.random().toString()}
      onChange={e => onChange(e.target.value)}
      onKeyPress={onKeyPress}
      placeholder={props.placeholder}
      spellCheck='false'
      type={props.type || 'text'}
      value={props.formValue || value}
    />
  )
}

export default GigTextInput;
