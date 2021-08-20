export type GigTextInputProps = {
  classNames?: string,
  formValue: string,
  id: string,
  onKeyPress?: (e: object) => void,
  placeholder: string,
  setFormValue: (input: string) => void,
  type?: string,
  validateFormValue?: (input: string) => void
}
