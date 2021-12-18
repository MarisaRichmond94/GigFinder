import './index.scss';

import { ReactElement } from 'react';
import { BsCheckSquare, BsSquare } from 'react-icons/bs';

import GigButton from 'components/gig_button';

type GigCheckboxInputProps = {
  classNames?: string,
  id: string,
  isActive: boolean,
  isDisabled?: boolean,
  text: string,
  toggleIsActive: (id: string) => void,
}

const GigCheckboxInput = (props: GigCheckboxInputProps): ReactElement => {
  return (
    <div className='gig-checkbox-container'>
      <GigButton
        classNames='icon-button off-black gig-checkbox'
        id={`gig-checkbox-${props.id}`}
        onClick={() => props.toggleIsActive(props.id)}
        textBlock={props.isActive ? <BsCheckSquare /> : <BsSquare />}
      />
      <div className={`gig-checkbox-text ${props.classNames}`}>{props.text}</div>
    </div>
  );
}

export default GigCheckboxInput;
