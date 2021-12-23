import './index.scss';

import { ReactElement } from 'react';
import { FaFileAlt } from 'react-icons/fa';

import GigDropdown from 'components/gig_input/dropdown';
import { useAuth } from 'providers/auth';
import { useUser } from 'providers/user';

interface ActiveResumeProps {
  isDisplayHeader?: boolean,
};

const ActiveResume = (props: ActiveResumeProps): ReactElement => {
  // context variables and functions
  const { isLoggedIn } = useAuth();
  const { activeResumeId, resumes, updateActiveResume } = useUser();
  // derived variables
  const doesUserHaveResumes = !!resumes?.length;
  const activeResume = resumes?.find(resume => resume.id === activeResumeId);

  const authenticatedView = (
    <GigDropdown
      id='active-resume-dropdown'
      isDisabled={!doesUserHaveResumes}
      options={
        resumes?.map(resume => {
          return {
            id: resume.id,
            displayName: resume.name,
            onClick: () => updateActiveResume(resume.id),
          };
        }) || []
      }
      placeholder={doesUserHaveResumes ? 'Select A Resume' : 'No Resumes'}
      selectedOption={activeResume ? { displayName: activeResume.name } : undefined}
    />
  );

  const unauthenticatedView = (
    <div className='sub-header-text off-white'>
      You need to sign in or create an account in order to use this feature
    </div>
  );

  return (
    <div id='active-resume-section'>
      {
        props.isDisplayHeader &&
        <div id='active-resume-header' className='thick header-text'>
          <FaFileAlt id='active-resume-header-icon' />&nbsp;
          Active Resume
        </div>
      }
      {isLoggedIn ? authenticatedView : unauthenticatedView}
    </div>
  );
};

export default ActiveResume;
