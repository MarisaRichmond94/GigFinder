import './index.scss';

import { ReactElement, useState } from 'react';

type GigTextAreaInputProps = {
  classNames?: string,
  clearKey?: string,
  formValue?: string,
  id: string,
  onKeyPress?: (e: object) => void,
  placeholder: string,
  rowCount?: number,
  setFormValue?: (input: string) => void,
  type?: string,
  validateFormValue?: (input: string) => void
}

const GigTextAreaInput = (props: GigTextAreaInputProps): ReactElement => {
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

  return (
    <textarea
      autoComplete='none'
      className={`gig-form-input sub-header-text ${props.classNames}`}
      id={props.id}
      name={Math.random().toString()}
      onChange={e => onChange(e.target.value)}
      placeholder={props.placeholder}
      rows={props.rowCount | 3}
      spellCheck='false'
      value={props.formValue || value}
    />
  )
}

export default GigTextAreaInput;
