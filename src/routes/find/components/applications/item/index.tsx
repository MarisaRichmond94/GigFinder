import './index.scss';

import { ReactElement } from 'react';
import { BsClockHistory, BsPersonCheck, BsPersonDash, BsStarFill } from 'react-icons/bs';

import GigButton from 'components/gig_button';
import { Gig, ApplicationStatus, PopulatedApplication } from 'types';

type GigApplicationItemProps = {
  item: PopulatedApplication,
  learnMoreAboutGig: (gig: Gig) => void,
}

const GigApplicationItem = (props: GigApplicationItemProps): ReactElement => {
  const { id, gig, status } = props.item;
  const { city, employer, rating, state, title } = gig;

  const getStatusIcon = (): ReactElement => {
    switch (status) {
      case ApplicationStatus.accepted:
        return <BsPersonCheck className={`status-icon ${status}`} />;
      case ApplicationStatus.rejected:
        return <BsPersonDash className={`status-icon ${status}`} />;
      case ApplicationStatus.pending:
      default:
        return <BsClockHistory className={`status-icon ${status}`} />;
    }
  }

  return (
    <div className='gig-application-item'>
      <div className='thick header-text gig-application-item-row header'>
        {title}
        {getStatusIcon()}
      </div>
      <div className='gig-application-item-row sub-header-text'>
        {employer}
        &nbsp;&nbsp;<div className='vertical-line' />&nbsp;&nbsp;
        <BsStarFill className='gig-application-item-star' />&nbsp;
        {rating}
      </div>
      <div className='gig-application-item-row'>
        <div className='sub-header-row sub-header-text'>
          {city}, {state}
        </div>
      </div>
      <div className='gig-application-item-row footer'>
        <GigButton
          classNames='learn-more-button primary-blue dark-background sub-header-text'
          id={`gig-application-learn-more-button-${id}`}
          onClick={() => props.learnMoreAboutGig(gig)}
          text='Learn More'
        />
      </div>
    </div>
  )
}

export default GigApplicationItem;
