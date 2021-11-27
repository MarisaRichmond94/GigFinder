import './index.scss';

import { ReactElement } from 'react';

import GigButton from 'components/gig_button';
import { useAuth } from 'providers/auth';
import { useUser } from 'providers/user';
import ActiveResume from 'routes/components/active_resume';
import { Gig } from 'types';

type FooterProps = {
  gig?: Gig,
  apply: (activeResumeId: string) => void,
  cancel: () => void,
}

const Footer = (props: FooterProps): ReactElement => {
  const { isLoggedIn } = useAuth();
  const { activeResumeId } = useUser();

  return (
    <div id='gig-details-modal-footer'>
      <div id='gig-details-modal-resume-selector-container' className='paragraph-text text-center'>
        {
          isLoggedIn
            ? <ActiveResume isDisplayHeader={false}/>
            : 'Log in or create an account to apply to gigs'
        }
        <div
          id='resume-application-message'
          className={
            `paragraph-text text-center
            ${isLoggedIn && !activeResumeId ? ' primary-red' : ' transparent'}`
          }
        >
          Select a resume to apply to this gig
        </div>
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
