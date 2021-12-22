import './index.scss';

import { ReactElement } from 'react';
import { Dropdown } from 'react-bootstrap';
import { IoIosArrowDown } from 'react-icons/io';

import { DropdownOption } from 'types';

type GigDropdownProps = {
  classNames?: string,
  id?: string,
  isDisabled?: boolean,
  onOptionSelect?: (option: DropdownOption) => void,
  options?: DropdownOption[] | undefined,
  placeholder: string,
  selectedOption: DropdownOption | undefined,
};

const GigDropdown = (props: GigDropdownProps): ReactElement => {
  // derived variables
  const activeInputText = props.selectedOption?.displayName || props.placeholder;

  const populateDropdownItems = () => {
    const options = props.selectedOption
      ? props.options.filter(option => option.displayName !== props.selectedOption?.displayName)
      : props.options;

    if (!options || !options.length) {
      return (
        <Dropdown.Item className='gig-dropdown-item'>
          <span className='sub-header-text'>
            {!options ? 'Loading...' : 'No options available'}
          </span>
        </Dropdown.Item>
      );
    };

    return options.map((option, index) => {
      return (
        <Dropdown.Item
          className='gig-dropdown-item'
          key={`${props.id}-${index}`}
          id={`${props.id}-${index}`}
          onClick={() => handleOptionSelect(option)}
          title={option.displayName}
        >
          {option.displayName}
        </Dropdown.Item>
      );
    });
  };

  const handleOptionSelect = (option: DropdownOption): void => {
    if (typeof option === 'object' && option?.onClick !== undefined) option.onClick();
    else if (props.onOptionSelect !== undefined) props.onOptionSelect(option);
  };

  const getClassNames = (): string => {
    const defaultClasses = 'gig-dropdown';
    return props.classNames ? `${defaultClasses} ${props.classNames}` : defaultClasses;
  };

  return (
    <Dropdown id={props.id} className={getClassNames()}>
      <Dropdown.Toggle className='sub-header-text' disabled={props.isDisabled || false}>
        <div className='gig-dropdown-button-content'>
          <div title={activeInputText}>{activeInputText}</div>
          <IoIosArrowDown />
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu className='gig-dropdown-menu sub-header-text'>
        {populateDropdownItems()}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default GigDropdown;
