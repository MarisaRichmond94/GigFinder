import './index.scss';

import { ReactElement } from 'react';
import { BsClock, BsPersonCheck } from 'react-icons/bs';

import { Application, ApplicationStatus } from 'types';

type HeaderProps = {
  item: Application,
};

const Header = (props: HeaderProps): ReactElement => {
  const { candidate, currentPosition, status } = props.item;
  const { name } = candidate;
  const { title } = currentPosition;

  return (
    <div className='application-header'>
      <div className='applicant-name bold sub-header-text' title={name}>{name}</div>
      <div className='vertical-line grey' />
      <div className='applicant-title sub-header-text' title={title}>{title}</div>
      <div className='application-status'>
        {
          status === ApplicationStatus.pending
            ? <BsClock />
            : <BsPersonCheck className='primary-green' />
        }
      </div>
    </div>
  );
};

export default Header;
