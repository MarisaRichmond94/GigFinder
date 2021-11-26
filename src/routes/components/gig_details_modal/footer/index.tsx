import './index.scss';

import { ReactElement } from 'react';

import GigButton from 'components/gig_button';
import { useUser } from 'providers/user';
import ActiveResume from 'routes/components/active_resume';
import { Gig } from 'types';

type FooterProps = {
  gig?: Gig,
  apply: (activeResumeId: string) => void,
  cancel: () => void,
}

const Footer = (props: FooterProps): ReactElement => {
  const { activeResumeId } = useUser();

  return (
    <div id='gig-details-modal-footer'>
      <div id='gig-details-modal-resume-selector-container'>
        <ActiveResume isDisplayHeader={false}/>
      </div>
      <GigButton
        classNames='medium-grey dark-background sub-header-text gig-details-modal-button'
        id='gig-details-modal-cancel-button'
        onClick={props.cancel}
        text='Cancel'
      />
      <GigButton
        classNames='primary-blue dark-background sub-header-text gig-details-modal-button'
        id='gig-details-modal-apply-button'
        isDisabled={!activeResumeId}
        onClick={() => props.apply(activeResumeId)}
        text='Apply'
      />
    </div>
  );
}

export default Footer;
