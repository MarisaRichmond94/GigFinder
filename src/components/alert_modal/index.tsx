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
};

const AlertModal = (props: AlertModalProps): ReactElement => (
  <GigModal
    classNames='off-white'
    headerContent={
      <div id='alert-header-container'>
        <VscAccount />
        <div className='header-text'>{props.title}</div>
      </div>
    }
    bodyContent={<div className='sub-header-text'>{props.message}</div>}
    footerContent={
      <GigButton
        classNames='primary-blue'
        onClick={() => props.setIsOpen(false)}
        text='Got it!'
      />
    }
    id='alert-modal'
    isOpen={props.isOpen}
    maxWidth={1000}
  />
);

export default AlertModal;
