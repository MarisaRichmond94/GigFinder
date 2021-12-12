import './index.scss';

import { ReactElement } from 'react';
import { FaRegSnowflake } from 'react-icons/fa';
import { GiCampfire } from 'react-icons/gi';

import { getFormattedViews } from 'libs/gigs';
import { Gig } from 'types';

type HeaderProps = {
  gig?: Gig,
}

const Header = (props: HeaderProps): ReactElement => {
  // destructured prop variables
  if (!props.gig) return null;
  const { city, state, title, views } = props.gig;

  return (
    <div id='gig-details-modal-header'>
      <div id='primary-header'>
        <div id='gig-details-title' className='bold header-text' title={title}>
          {title}
        </div>
        &nbsp;<div className='vertical-line grey' />&nbsp;
        {views > 5000 ? <GiCampfire /> : <FaRegSnowflake />}&nbsp;
        <div className='gig-item-views sub-header-text' title={getFormattedViews(views)}>
          {getFormattedViews(views)}
        </div>
      </div>
      <div className='header-text' id='sub-header'>
        {city}, {state}
      </div>
    </div>
  );
}

export default Header;
