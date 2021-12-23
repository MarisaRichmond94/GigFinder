import './index.scss';

import { ReactElement, useCallback } from 'react';

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
  const { isLoggedIn } = useAuth();
  const { activeGig, activeResumeId, applications, applyToGig } = useUser();
  // derived variables
  const matchingGigApplication = applications.find(gigApp => gigApp.gig.id === activeGig.id);
  const isApplyDisabled = !!(!activeResumeId || matchingGigApplication);
  const { applyCallback, cancel } = props;
  const gig = props?.gig;

  const apply = useCallback((): void => {
    applyToGig(gig);
    applyCallback();
  }, [applyCallback, applyToGig, gig]);

  return (
    <div id='find-gig-details-modal-footer'>
      <div id='gig-details-modal-resume-selector-container' className='paragraph-text text-center'>
        {
          isLoggedIn
            ? <ActiveResume isDisplayHeader={false}/>
            : 'Log in or create an account to apply to gigs'
        }
        {
          isLoggedIn && !activeResumeId &&
          <div className='paragraph-text text-center text primary-red message'>
            Select a resume to apply to this gig
          </div>
        }
      </div>
      <div id='gig-details-modal-button-container'>
        <div id='action-buttons'>
          <GigButton
            classNames='medium-grey dark-background sub-header-text gig-details-modal-button'
            id='gig-details-modal-cancel-button'
            onClick={cancel}
            text='Close'
          />
          <GigButton
            classNames='primary-blue dark-background sub-header-text gig-details-modal-button'
            id='gig-details-modal-apply-button'
            isDisabled={isApplyDisabled}
            onClick={apply}
            text='Apply'
          />
        </div>
        {
          matchingGigApplication &&
          <div className='paragraph-text text-center text primary-red message'>
            Gig application already submitted
          </div>
        }
      </div>
    </div>
  );
}

export default Footer;
