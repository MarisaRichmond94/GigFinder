import { ReactElement } from 'react';
import { BsClockHistory, BsPersonCheck, BsPersonDash } from 'react-icons/bs';

import {ApplicationStatus } from 'types';

const getStatus = (status: ApplicationStatus) => {
  switch (status) {
    case ApplicationStatus.rejected:
      return 'Rejected';
    case ApplicationStatus.accepted:
      return 'Undergoing Consideration';
    case ApplicationStatus.pending:
    default:
      return 'Awaiting Review';
  }
};

const getStatusIcon = (status: ApplicationStatus): ReactElement => {
  switch (status) {
    case ApplicationStatus.accepted:
      return <BsPersonCheck className={`status-icon icon text primary-green`} />;
    case ApplicationStatus.rejected:
      return <BsPersonDash className={`status-icon icon text primary-red`} />;
    case ApplicationStatus.pending:
    default:
      return <BsClockHistory className={`status-icon icon text medium-grey`} />;
  }
};

export {
  getStatus,
  getStatusIcon,
};
