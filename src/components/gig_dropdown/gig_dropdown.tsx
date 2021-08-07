import './gig_dropdown.scss';

import { ReactElement } from 'react';
import { Dropdown } from 'react-bootstrap';

type Option = {
  displayName: string,
  icon?: ReactElement,
  onClick?: () => void,
}

type GigDropdownProps = {
  classNames?: string,
  id: string,
  isDisabled?: boolean,
  onOptionSelect?: (option: Option) => void,
  options?: Option[] | undefined,
  selectedOption: Option | undefined,
  title: object | string
}

const GigDropdown = (props: GigDropdownProps): ReactElement => {
  const populateDropdownItems = () => {
    if (!props.options || !props.options.length) {
      return (
        <Dropdown.Item>
          <span className='paragraph-text'>
            {!props.options ? 'Loading...' : 'No options available'}
          </span>
        </Dropdown.Item>
      )
    } else {
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
    <Dropdown className={`remove-focus-highlight gig-dropdown ${props.classNames}`}>
      <Dropdown.Toggle className='paragraph-text' disabled={props.isDisabled || false}>
        {props.selectedOption?.displayName || props.title}
      </Dropdown.Toggle>
      <Dropdown.Menu className='gig-dropdown-menu paragraph-text'>
        {populateDropdownItems()}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default GigDropdown;
