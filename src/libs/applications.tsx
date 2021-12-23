import { ReactElement } from 'react';
import { BsClockHistory, BsPersonCheck, BsPersonDash } from 'react-icons/bs';

import {ApplicationStatus } from 'types';

const getStatusIcon = (status: ApplicationStatus): ReactElement => {
  switch (status) {
    case ApplicationStatus.accepted:
      return <BsPersonCheck className={`status-icon icon primary-green`} />;
    case ApplicationStatus.rejected:
      return <BsPersonDash className={`status-icon icon primary-red`} />;
    case ApplicationStatus.pending:
    default:
      return <BsClockHistory className={`status-icon icon medium-grey`} />;
  }
};

export {
  getStatusIcon,
}
