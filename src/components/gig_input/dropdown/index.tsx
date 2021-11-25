import './index.scss';

import { ReactElement } from 'react';
import { Dropdown } from 'react-bootstrap';
import { IoIosArrowDown } from 'react-icons/io';

import { Option } from 'types';

type GigDropdownProps = {
  classNames?: string,
  id: string,
  isDisabled?: boolean,
  onOptionSelect?: (option: Option) => void,
  options?: Option[] | undefined,
  placeholder: string,
  selectedOption: Option | undefined,
}

const GigDropdown = (props: GigDropdownProps): ReactElement => {
  const populateDropdownItems = () => {
    if (!props.options || !props.options.length) {
      return (
        <Dropdown.Item className='overflow-ellipsis gig-dropdown-item'>
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
          className='gig-dropdown-item'
          key={`${props.id}-${index}`}
          id={`${props.id}-${index}`}
          onClick={() => handleOptionSelect(option)}
          title={option.displayName}
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

  const activeInputText = props.selectedOption?.displayName || props.placeholder;

  return (
    <Dropdown className={`gig-dropdown${props.classNames ? ` ${props.classNames}` : ''}`}>
      <Dropdown.Toggle className='sub-header-text' disabled={props.isDisabled || false}>
        <div className='gig-dropdown-content-wrapper'>
          <div className='gig-dropdown-text' title={activeInputText}>
            {activeInputText}
          </div>
          <IoIosArrowDown className='gig-dropdown-icon' />
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu className='gig-dropdown-menu sub-header-text'>
        {populateDropdownItems()}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default GigDropdown;
