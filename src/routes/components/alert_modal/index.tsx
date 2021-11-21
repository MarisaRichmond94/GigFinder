import './index.scss';

import { ReactElement } from 'react';
import { VscAccount } from 'react-icons/vsc';

import GigModal from 'components/gig_modal';
import GigButton from 'components/gig_button';

type AlertModalProps = {
  isOpen: boolean,
  message: string,
  title: string,
  setIsOpen: (isOpen: boolean) => void,
}

const AlertModal = (props: AlertModalProps): ReactElement => {

  const headerContent = (
    <div id='alert-header-container'>
      <VscAccount />
      <div className='header-text'>
        {props.title}
      </div>
    </div>
  );

  const bodyContent = (
    <div id='alert-body-container' className='sub-header-text'>
      {props.message}
    </div>
  );

  const footerContent = (
    <div id='alert-footer-container'>
      <GigButton
        id='alert-acknowledge-button'
        onClick={() => props.setIsOpen(false)}
        text='Got it!'
      />
    </div>
  );

  return (
    <div id='alert-modal-container'>
      <GigModal
        bodyContent={bodyContent}
        headerContent={headerContent}
        footerContent={footerContent}
        id='alert-modal'
        isOpen={props.isOpen}
      />
    </div>
  );
}

export default AlertModal;
