import './index.scss';

import { ReactElement } from 'react';

import GigButton from 'components/gig_button';
import { useAuth } from 'providers/auth';
import { useUser } from 'providers/user';
import ActiveResume from 'routes/find/components/active_resume';
import { Gig } from 'types';

type FooterProps = {
  gig?: Gig,
  applyCallback: () => void,
  cancel: () => void,
}

const Footer = (props: FooterProps): ReactElement => {
  // context variables and functions
  const { isLoggedIn, user } = useAuth();
  const { activeGig, activeResumeId, gigApplications, applyToGig } = useUser();
  // derived variables
  const matchingGigApplication = gigApplications.find(gigApp => gigApp.gig.id === activeGig.id);
  const isApplyDisabled = !!(!activeResumeId || matchingGigApplication);

  const apply = (): void => {
    applyToGig(user.id, props.gig.id);
    props.applyCallback();
  }

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
      <div id='gig-details-modal-button-container'>
        <div id='action-buttons'>
          <GigButton
            classNames='medium-grey dark-background sub-header-text gig-details-modal-button'
            id='gig-details-modal-cancel-button'
            onClick={props.cancel}
            text='Cancel'
          />
          <GigButton
            classNames='primary-blue dark-background sub-header-text gig-details-modal-button'
            id='gig-details-modal-apply-button'
            isDisabled={isApplyDisabled}
            onClick={apply}
            text='Apply'
          />
        </div>
        <div
          id='gig-application-message'
          className={
            `paragraph-text text-center
            ${isLoggedIn && matchingGigApplication ? ' primary-red' : ' transparent'}`
          }
        >
          Gig application already submitted
        </div>
      </div>
    </div>
  );
}

export default Footer;
