import './index.scss';

import { ReactElement } from 'react';

import { getStatus } from 'libs/applications';
import { Application } from 'types';

type HeaderProps = {
  application?: Application,
};

const Header = (props: HeaderProps): ReactElement => {
  // destructured prop variables
  if (!props.application) return null;
  const { candidate, previousPosition, status } = props.application;
  const { name } = candidate;
  const { title } = previousPosition;

  const applicationStatus = getStatus(status);

  return (
    <div id='application-modal-header'>
      <div className='bold large-header-text hide-overflow-ellipsis' title={name}>{name}</div>
      <div className='sub-header-text hide-overflow-ellipsis' title={title}>{title}</div>
      <div className='flex-row'>
        <div className='bold small-header-text'>Status:</div>
        <div className='small-header-text hide-overflow-ellipsis' title={applicationStatus}>
          {applicationStatus}
        </div>
      </div>
    </div>
  );
};

export default Header;
