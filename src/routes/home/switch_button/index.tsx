import './index.scss';

import { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';

import GigButton from 'components/gig_button';
import settings from 'settings';

const SwitchButton = (): ReactElement => {
  const history = useHistory();

  return (
    <GigButton
      classNames='header-text primary-blue text'
      id='search-form-switch-button'
      onClick={() => history.push(settings.CREATE_ROUTE)}
      text='Switch'
    />
  )
}

export default SwitchButton;
