import './demo_warning.scss';

import { ReactElement } from 'react';
import { AiFillInfoCircle } from 'react-icons/ai';

const DemoWarning = (): ReactElement => {
  return (
    <div id='demo-warning'>
      <div className='icon'>
        <AiFillInfoCircle />
      </div>
      <p className='paragraph-text'>This is just a demo site</p>
    </div>
  )
}

export default DemoWarning;
