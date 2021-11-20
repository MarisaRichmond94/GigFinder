import { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';

import settings from 'settings';

const SwitchButton = (): ReactElement => {
  const history = useHistory();

  return (
    <button
      className='primary-blue text-gig-button'
      id='search-form-switch-button'
      onClick={() => history.push(settings.CREATE_ROUTE)}
    >
      Switch
    </button>
  )
}

export default SwitchButton;
