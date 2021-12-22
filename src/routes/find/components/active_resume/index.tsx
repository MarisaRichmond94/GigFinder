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
  const { activeResumeId, resumes, updateActiveResume } = useUser();
  // derived variables
  const doesUserHaveResumes = !!resumes?.length;
  const activeResume = resumes?.find(resume => resume.id === activeResumeId);
  const isDisplayHeader = props.isDisplayHeader || true;

  return (
    <div
      id='active-resume-section'
      className={props.isDisplayHeader ? 'with-header' : 'without-header'}
    >
      {
        isDisplayHeader &&
        <div id='active-resume-header' className='thick header-text'>
          <FaFileAlt id='active-resume-header-icon' />&nbsp;
          Active Resume
        </div>
      }
      {
        isLoggedIn
          ? (
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
