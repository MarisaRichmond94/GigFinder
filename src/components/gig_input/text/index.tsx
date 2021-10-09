import './index.scss';

import { ReactElement } from 'react';

import { GigTextInputProps } from './types';

const GigTextInput = (props: GigTextInputProps): ReactElement => {
  const onChange = (input: string): void => {
    props.setFormValue(input);
    if (props.validateFormValue) {
      props.validateFormValue(input);
    }
  }

  const onKeyPress = (e: any): void => {
    if (props.onKeyPress) {
      props.onKeyPress(e);
    }
  }

  return (
    <input
      autoComplete='none'
      className={`gig-form-input paragraph-text ${props.classNames}`}
      id={props.id}
      name={Math.random().toString()}
      onChange={e => onChange(e.target.value)}
      onKeyPress={onKeyPress}
      placeholder={props.placeholder}
      spellCheck='false'
      type={props.type || 'text'}
      value={props.formValue}
    />
  )
}

export default GigTextInput;
