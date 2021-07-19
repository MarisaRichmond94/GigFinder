import { ReactElement } from 'react';

const SwitchButton = (): ReactElement => {
  const onClick = (): void => {

  }

  return (
    <button
      className='primary-blue-text-gig-button'
      id='search-form-switch-button'
      onClick={onClick}
    >
      Switch
    </button>
  )
}

export default SwitchButton;
