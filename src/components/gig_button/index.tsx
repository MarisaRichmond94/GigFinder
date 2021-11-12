import { ReactElement } from 'react';
import { Button } from 'react-bootstrap';

type GigButtonProps = {
  classNames?: string,
  icon?: string,
  id: string,
  isDisabled?: boolean,
  onClick: (e: object) => void,
  style?: object,
  text?: string,
  textBlock?: ReactElement,
}

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
