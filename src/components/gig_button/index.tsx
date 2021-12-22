import { ReactElement } from 'react';
import { Button } from 'react-bootstrap';

type GigButtonProps = {
  classNames?: string,
  id?: string,
  isDisabled?: boolean,
  onClick: (e: object) => void,
  text?: string,
  textBlock?: ReactElement,
};

const GigButton = (props: GigButtonProps): ReactElement => {
  return (
    <Button
      className={`gig-button${props.classNames ? ` ${props.classNames}` : ''}`}
      disabled={props.isDisabled || false}
      id={props.id}
      onClick={props.onClick}
    >
      {props.text || props.textBlock || ''}
    </Button>
  );
};

export default GigButton;
