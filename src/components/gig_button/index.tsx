import { ReactElement } from 'react';
import { Button } from 'react-bootstrap';

import { GigButtonProps } from './types';

const GigButton = (props: GigButtonProps): ReactElement => {
  return (
    <Button
      className={`gig-button${props.classNames ? ` ${props.classNames}` : ''}`}
      disabled={props.isDisabled || false}
      id={props.id}
      onClick={props.onClick}
      style={props.style || {}}
    >
      {props.icon}
      {props.text || props.textBlock || ''}
    </Button>
  );
}

export default GigButton;
