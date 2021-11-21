import './index.scss'

import { ReactElement, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

type CollapsableSectionProps = {
  children: ReactElement,
  icon: ReactElement,
  sectionTitle: string,
}

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
      <div className={isVisible ? 'visible' : 'hidden'}>
        {props.children}
      </div>
    </div>
  );
}

export default CollapsableSection;
