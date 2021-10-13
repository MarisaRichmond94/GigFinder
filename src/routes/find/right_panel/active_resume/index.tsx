import './index.scss';

import { ReactElement } from 'react';
import { FaFileAlt } from 'react-icons/fa';

import GigDropdown from 'components/gig_input/dropdown';
import { useAuth } from 'providers/auth';

const ActiveResume = (): ReactElement => {
  const { isLoggedIn } = useAuth();

  const doesUserHaveResumes = false; // TODO - set this up

  return (
    <div id='active-resume-section'>
      <div id='active-resume-header' className='thick-header-text'>
        <FaFileAlt id='active-resume-header-icon' />&nbsp;
        Active Resume
      </div>
      {
        isLoggedIn
          ? (
            <GigDropdown
              classNames='off-white-gig-dropdown'
              id='active-resume-dropdown'
              isDisabled={doesUserHaveResumes}
              options={[]}
              placeholder='Select A Resume'
              selectedOption={undefined}
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
