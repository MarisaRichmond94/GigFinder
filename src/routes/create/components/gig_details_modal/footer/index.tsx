import './index.scss';

import { ReactElement } from 'react';

import GigButton from 'components/gig_button';

type FooterProps = {
  cancel: () => void,
  isInEditMode: boolean,
  toggleIsInEditMode: () => void,
}

const Footer = (props: FooterProps): ReactElement => {
  return (
    <div id='gig-details-modal-footer'>
      <div id='action-buttons'>
        <GigButton
          classNames='medium-grey dark-background sub-header-text gig-details-modal-button'
          id='gig-details-modal-cancel-button'
          onClick={props.cancel}
          text={props.isInEditMode ? 'Cancel' : 'Close'}
        />
        <GigButton
          classNames='primary-blue dark-background sub-header-text gig-details-modal-button'
          id='gig-details-modal-apply-button'
          onClick={props.toggleIsInEditMode}
          text={props.isInEditMode ? 'Update Details' : 'Edit Details'}
        />
      </div>
    </div>
  );
}

export default Footer;