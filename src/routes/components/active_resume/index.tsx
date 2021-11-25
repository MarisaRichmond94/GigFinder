import './index.scss';

import { ReactElement } from 'react';
import { FaFileAlt } from 'react-icons/fa';

import GigDropdown from 'components/gig_input/dropdown';
import { useAuth } from 'providers/auth';
import { useUser } from 'providers/user';

interface ActiveResumeProps {
  isDisplayHeader?: boolean,
}

const ActiveResume = (props: ActiveResumeProps): ReactElement => {
  // context variables and functions
  const { isLoggedIn } = useAuth();
  const { activeResumeId, userResumes, updateActiveResume } = useUser();
  // derived variables
  const doesUserHaveResumes = !!userResumes?.length;
  const activeUserResume = userResumes?.find(userResume => userResume.id === activeResumeId);
  const isDisplayHeader = props.isDisplayHeader || true;

  return (
    <div id='active-resume-section'>
      {
        isDisplayHeader &&
        <div id='active-resume-header' className='thick-header-text'>
          <FaFileAlt id='active-resume-header-icon' />&nbsp;
          Active Resume
        </div>
      }
      {
        isLoggedIn
          ? (
            <GigDropdown
              classNames='off-white-gig-dropdown'
              id='active-resume-dropdown'
              isDisabled={!doesUserHaveResumes}
              options={
                userResumes?.map(userResume => {
                  return {
                    id: userResume.id,
                    displayName: userResume.name,
                    onClick: () => updateActiveResume(userResume.id),
                  };
                }) || []
              }
              placeholder={doesUserHaveResumes ? 'Select A Resume' : 'No Resumes'}
              selectedOption={activeUserResume ? { displayName: activeUserResume.name } : undefined}
            />
          )
          : (
            <div className='sub-header-text'>
              You need to sign in or create an account in order to use this feature
            </div>
          )
      }
    </div>
  );
}

export default ActiveResume;
