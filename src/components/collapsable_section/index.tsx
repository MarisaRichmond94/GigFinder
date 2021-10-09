import './index.scss'

import { ReactElement, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import { CollapsableSectionProps } from './types';

const CollapsableSection = (props: CollapsableSectionProps): ReactElement => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className='collapsable-section'>
      <div className='collapsable-section-header'>
        <div className='collapsable-section-title'>{props.icon} {props.sectionTitle}</div>
        <div>
          {
            isVisible
              ? <IoIosArrowDown onClick={() => setIsVisible(false)}/>
              : <IoIosArrowUp onClick={() => setIsVisible(true)}/>
          }
        </div>
      </div>
      <hr className='collapsable-section-divider'/>
      {isVisible && props.children}
    </div>
  );
}

export default CollapsableSection;
