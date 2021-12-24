import { ReactElement, useRef, useState } from 'react';

import { useOnClickOutside } from 'hooks/useOnClickOutside';

type ControlledSearchableGigInputProps = {
  classNames?: string,
  formValue: string,
  id?: string,
  options: string[],
  placeholder: string,
  onChange: (updatedValue: string) => void,
  onOptionSelect: (option: string) => void,
};

const ControlledSearchableGigInput = (props: ControlledSearchableGigInputProps): ReactElement => {
  const [filteredOptions, setFilteredOptions] = useState(
    props.options?.filter(option => option !== props.formValue) || props.options
  );
  const [isInputFocused, setIsInputFocused] = useState(false);

  const optionsRef = useRef(null);
  useOnClickOutside(optionsRef, () => setIsInputFocused(false));

  const buildFilteredOptionsList = (): any => {
    const classes = `filter-options-list sub-header-text ${isInputFocused ? 'visible' : 'hidden'}`;
    let isFirstMatch = true;
    return (
      <ul className={classes} ref={optionsRef}>
        {filteredOptions?.map(option => {
          let itemClasses = '';
          if (isFirstMatch) {
            isFirstMatch = false;
            if (
              filteredOptions.length === 1 ||
              option.length - props.formValue.length < 5 ||
              option.toLowerCase() === props.formValue.toLowerCase()
            ) {
              itemClasses = 'best-match'
            }
          }
          return (
            <li className={itemClasses} key={option} onClick={() => onOptionSelect(option)}>
              {option}
            </li>
          );
        })}
      </ul>
    );
  };

  const onOptionSelect = (option: string) => {
    props.onOptionSelect(option);
    setIsInputFocused(false);
  };

  const onChange = (updatedValue: string): void => {
    if (!isInputFocused) setIsInputFocused(true);
    props.onChange(updatedValue);
    const updatedFilteredOptions = props.options?.filter(
      option => (
        option !== props.formValue &&
        option.toLowerCase().includes(updatedValue.toLowerCase())
      )
    ) || [];
    setFilteredOptions(updatedFilteredOptions);
  };

  const onKeyPress = (event: any): void => {
    if (event.key === 'Enter' && props.formValue !== '' && filteredOptions.length) {
      props.onOptionSelect(filteredOptions[0]);
      setIsInputFocused(false);
    }
  };

  return (
    <div className={`searchable-gig-input ${props.classNames}`} id={props.id}>
      <input
        autoComplete='none'
        className={`gig-form-input sub-header-text${isInputFocused ? ' focused' : ''}`}
        id={props.id}
        name={Math.random().toString()}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setIsInputFocused(true)}
        onKeyPress={onKeyPress}
        placeholder={props.placeholder}
        spellCheck='false'
        type='text'
        value={props.formValue}
      />
      {buildFilteredOptionsList()}
    </div>
  );
};

export default ControlledSearchableGigInput;
