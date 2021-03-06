import './index.scss'

import { ReactElement, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

type CollapsableSectionProps = {
  children: ReactElement,
  classNames?: string,
  icon: ReactElement,
  id: string,
  isVisible?: boolean,
  sectionTitle: string,
  onToggleCallback?: () => void,
}

const CollapsableSection = (props: CollapsableSectionProps): ReactElement => {
  const [isVisible, setIsVisible] = useState(
    typeof props.isVisible == 'boolean' ? props.isVisible : true,
  );

  const onToggle = (updatedIsVisible: boolean): void => {
    setIsVisible(updatedIsVisible);
    if (!!props.onToggleCallback) {
      props.onToggleCallback();
    };
  };

  const getClassNames = (): string => {
    const classes = 'collapsable-section';
    return props.classNames ? `${classes} ${props.classNames}` : classes;
  };

  return (
    <div id={props.id} className={getClassNames()}>
      <div className='collapsable-section-header header-text'>
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
