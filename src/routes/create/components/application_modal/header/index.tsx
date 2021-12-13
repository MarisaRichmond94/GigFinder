import './index.scss';

import { ReactElement } from 'react';

import { Application, ApplicationStatus } from 'types';

type HeaderProps = {
  application?: Application,
}

const Header = (props: HeaderProps): ReactElement => {
  // destructured prop variables
  if (!props.application) return null;
  const { candidate, previousPosition, status } = props.application;
  const { name } = candidate;
  const { title } = previousPosition;

  const getStatus = () => {
    switch (status) {
      case ApplicationStatus.rejected:
        return 'Rejected';
      case ApplicationStatus.accepted:
        return 'Undergoing Consideration';
      case ApplicationStatus.pending:
      default:
        return 'Awaiting Review';
    }
  }

  return (
    <div id='application-modal-header'>
      <div id='applicant-header-details'>
        <div className='bold large-header-text'>{name}</div>
        <div className='sub-header-text'>{title}</div>
      </div>
      <div id='status-header-details'>
        <div>
          <div className='bold sub-header-text'>Status:</div>
          <div className='sub-header-text'>{getStatus()}</div>
        </div>
      </div>
    </div>
  );
}

export default Header;
