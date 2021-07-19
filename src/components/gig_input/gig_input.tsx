import './gig_input.scss';

import { ReactElement } from 'react';

type GigInputProps = {
  classNames?: string,
  formValue: string,
  id: string,
  onKeyPress?: (e: object) => void,
  placeholder: string,
  setFormValue: (input: string) => void,
  type?: string,
  validateFormValue?: (input: string) => void
}

const GigInput = (props: GigInputProps): ReactElement => {
  const onChange = (input: string): void => {
    props.setFormValue(input);
    if (props.validateFormValue) {
      props.validateFormValue(input);
    }
  }

  return (
    <input
      autoComplete='none'
      className={`remove-focus-highlight gig-form-input ${props.classNames}`}
      id={props.id}
      name={Math.random().toString()}
      onChange={e => onChange(e.target.value)}
      onKeyPress={
        e => {
          if (props.onKeyPress) props.onKeyPress(e)
        }
      }
      placeholder={props.placeholder}
      spellCheck='false'
      type={props.type || 'text'}
      value={props.formValue}
    >
    </input>
  )
}

export default GigInput;
