import './index.scss'

import { ReactElement, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

type CollapsableSectionProps = {
  children: ReactElement,
  classNames?: string,
  icon: ReactElement,
  id: string,
  onToggleCallback?: () => void,
  sectionTitle: string,
}

const CollapsableSection = (props: CollapsableSectionProps): ReactElement => {
  const [isVisible, setIsVisible] = useState(true);

  const onToggle = (updatedIsVisible: boolean): void => {
    setIsVisible(updatedIsVisible);
    if (!!props.onToggleCallback) props.onToggleCallback();
  }

  return (
    <div
      id={props.id}
      className={`collapsable-section${props.classNames ? ` ${props.classNames}` : ''}`}
    >
      <div className='collapsable-section-header'>
        <div className='collapsable-section-title'>{props.icon} {props.sectionTitle}</div>
        <div>
          {
            isVisible
              ? <IoIosArrowDown onClick={() => onToggle(false)}/>
              : <IoIosArrowUp onClick={() => onToggle(true)}/>
          }
        </div>
      </div>
      <hr className='collapsable-section-divider'/>
      <div className={isVisible ? 'visible' : 'hidden'}>
        {props.children}
      </div>
    </div>
  );
}

export default CollapsableSection;
