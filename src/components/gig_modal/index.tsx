import './index.scss';

import { ReactElement, useEffect, useRef } from 'react';

import useElementResize from 'hooks/useElementResize';

type GigModalProps = {
  bodyContent: ReactElement,
  classNames?: string,
  footerContent?: ReactElement,
  headerContent?: ReactElement,
  id: string,
  isOpen: boolean,
  maxWidth?: number,
};

const GigModal = (props: GigModalProps): ReactElement => {
  const contentRef = useRef(null);
  let { width: contentWidth, setWidth: setContentWidth } = useElementResize(contentRef);
  const rightPanel = document.getElementById('right-panel');

  useEffect(() => {
    if (props.isOpen && contentWidth === 0) {
      setContentWidth(contentRef.current?.clientWidth);
    }
  }, [contentWidth, setContentWidth, props.isOpen]);

  const getClassNames = (): string => {
    const classNames = contentWidth === props.maxWidth ? 'maxed-content-width' : '';
    return `${rightPanel ? 'right-panel' : 'no-right-panel'} ${classNames} set-max-width`;
  };

  return (
    <div className={`gig-modal ${props.isOpen ? 'visible' : 'hidden'}`} id={props.id}>
      <div
        className={`gig-modal-content ${props.maxWidth ? getClassNames() : ''} ${props.classNames}`}
        id={`${props.id}-content`}
        ref={contentRef}
      >
        {props.headerContent && <div className='gig-modal-header'>{props.headerContent}</div>}
        <div className='gig-modal-body'>{props.bodyContent}</div>
        {props.footerContent && <div className='gig-modal-footer'>{props.footerContent}</div>}
      </div>
    </div>
  );
};

export default GigModal;
