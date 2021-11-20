import './index.scss';

import { ReactElement } from 'react';

type GigModalProps = {
  bodyContent: any,
  footerContent?: any,
  headerContent?: any,
  id: string,
  isOpen: boolean,
}

const GigModal = (props: GigModalProps): ReactElement => {
  return (
    <div className={`gig-modal ${props.isOpen ? 'visible' : 'hidden'}`} id={props.id}>
      <div className='gig-modal-content'>
        {
          props.headerContent &&
          <div className='gig-modal-header'>
            {props.headerContent}
          </div>
        }
        <div className='gig-modal-body'>
          {props.bodyContent}
        </div>
        {
          props.footerContent &&
          <div className='gig-modal-footer'>
            {props.footerContent}
          </div>
        }
      </div>
    </div>
  );
}

export default GigModal;
