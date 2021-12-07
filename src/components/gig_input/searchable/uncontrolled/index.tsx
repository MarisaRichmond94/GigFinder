import '../index.scss';

import { ReactElement, useEffect, useRef, useState } from 'react';
import { debounce } from 'throttle-debounce';

import { useOnClickOutside } from 'hooks/useOnClickOutside';

type SearchableGigInputProps = {
  classNames?: string,
  clearKey?: string,
  id: string,
  options: string[],
  placeholder: string,
  selectedOptions: string[],
  onOptionSelect: (option: string) => void,
}

const UncontrolledSearchableGigInput = (props: SearchableGigInputProps): ReactElement => {
  const [filteredOptions, setFilteredOptions] = useState(
    props.options?.filter(option => !props.selectedOptions?.includes(option)) || props.options
  );
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    setFilteredOptions(
      props.options?.filter(option => !props.selectedOptions?.includes(option)) || props.options
    );
    // eslint-disable-next-line
  }, [props.selectedOptions]);

  const optionsRef = useRef(null);
  useOnClickOutside(optionsRef, () => setIsInputFocused(false));

  const [debouncedUpdateFilteredOptions] = useState(
    () => debounce(250, false, (updatedValue: string): void => {
      const updatedFilteredOptions = props.options?.filter(
        option => (
          !props.selectedOptions?.includes(option) &&
          option.toLowerCase()?.includes(updatedValue.toLowerCase())
        )
      ) || [];
      setFilteredOptions(updatedFilteredOptions);
    }),
  );

  const buildFilteredOptionsList = (): any => {
    const classes = `filter-options-list sub-header-text ${isInputFocused ? 'visible' : 'hidden'}`;
    let isFirstMatch = true;
    return (
      <ul className={classes} ref={optionsRef}>
        {filteredOptions.map(option => {
          let itemClasses = '';
          if (isFirstMatch) {
            isFirstMatch = false;
            if (filteredOptions.length === 1 || option.length - value.length < 5) {
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
  }

  const onOptionSelect = (option: string) => {
    props.onOptionSelect(option);
    setIsInputFocused(false);
  }

  const onChange = (updatedValue: string): void => {
    setValue(updatedValue);
    debouncedUpdateFilteredOptions(updatedValue);
  }

  const onKeyPress = (event: any): void => {
    if (event.key === 'Enter' && value !== '' && filteredOptions.length) {
      props.onOptionSelect(filteredOptions[0]);
      setValue('');
      setIsInputFocused(false);
    } else if (props.clearKey && event.key === props.clearKey) {
      setValue('');
    }
  }

  return (
    <div className='searchable-gig-input'>
      <input
        autoComplete='none'
        className={`
          gig-form-input sub-header-text
          ${props.classNames}${isInputFocused ? ' focused' : ''}
        `}
        id={props.id}
        name={Math.random().toString()}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setIsInputFocused(true)}
        onKeyPress={onKeyPress}
        placeholder={props.placeholder}
        spellCheck='false'
        type='text'
        value={value}
      />
      {buildFilteredOptionsList()}
    </div>
  );
}

export default UncontrolledSearchableGigInput;
