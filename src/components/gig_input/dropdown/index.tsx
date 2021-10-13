import './index.scss';

import { ReactElement } from 'react';
import { Dropdown } from 'react-bootstrap';

import { GigDropdownProps, Option } from './types';

const GigDropdown = (props: GigDropdownProps): ReactElement => {
  const populateDropdownItems = () => {
    if (!props.options || !props.options.length) {
      return (
        <Dropdown.Item>
          <span className='sub-header-text'>
            {!props.options ? 'Loading...' : 'No options available'}
          </span>
        </Dropdown.Item>
      )
    }

    const options = props.selectedOption
      ? props.options.filter(option => option.displayName !== props.selectedOption?.displayName)
      : props.options;

    return options.map((option, index) => {
      const content = option.icon
        ? <>{option.icon}&nbsp;&nbsp;{option.displayName}</>
        : option.displayName;
      return (
        <Dropdown.Item
          className='overflow-ellipsis gig-dropdown-item'
          key={`${props.id}-${index}`}
          id={`${props.id}-${index}`}
          onClick={() => handleOptionSelect(option)}
        >
          {content}
        </Dropdown.Item>
      )
    })
  }

  const handleOptionSelect = (option: Option): void => {
    if (typeof option === 'object' && option?.onClick !== undefined) {
      option.onClick();
    } else if (props.onOptionSelect !== undefined) {
      props.onOptionSelect(option);
    } else {
      throw new Error(
        `An exception was found in gig_dropdown/handleOptionSelect. Missing onOptionSelect and
        option.onClick`
      )
    }
  }

  return (
    <Dropdown className={`gig-dropdown ${props.classNames}`}>
      <Dropdown.Toggle className='sub-header-text' disabled={props.isDisabled || false}>
        {props.selectedOption?.displayName || props.title}
      </Dropdown.Toggle>
      <Dropdown.Menu className='gig-dropdown-menu sub-header-text'>
        {populateDropdownItems()}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default GigDropdown;
