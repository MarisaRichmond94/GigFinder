import './index.scss';

import { ReactElement } from 'react';
import { BsCheckSquare, BsSquare } from 'react-icons/bs';

import GigButton from 'components/gig_button';

type GigCheckboxInputProps = {
  isActive: boolean,
  isDisabled?: boolean,
  text: string,
  toggleIsActive: () => void,
};

const GigCheckboxInput = (props: GigCheckboxInputProps): ReactElement => {
  return (
    <div className='gig-checkbox-container'>
      <GigButton
        classNames='icon-button off-black gig-checkbox'
        onClick={() => props.toggleIsActive()}
        textBlock={props.isActive ? <BsCheckSquare /> : <BsSquare />}
      />
      <div className='sub-header-text'>{props.text}</div>
    </div>
  );
};

export default GigCheckboxInput;
