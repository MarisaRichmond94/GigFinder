import { ReactElement } from 'react';

import GigButton from 'components/gig_button';

interface SelectorButtonProps {
  buttonClasses?: string,
  isActive: boolean,
  panelType: string,
  setActivePanel: (activePanel: string) => void,
};

const SelectorButton = (props: SelectorButtonProps): ReactElement => {
  const buttonClasses = props.buttonClasses || 'underline-text off-black header-text';

  return (
    <GigButton
      classNames={`${props.isActive ? 'active ' : ''}${buttonClasses}`}
      onClick={() => props.setActivePanel(props.panelType.toLowerCase())}
      text={props.panelType}
    />
  );
};

export default SelectorButton;
