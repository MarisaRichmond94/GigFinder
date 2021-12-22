import './index.scss';

import { ReactElement } from 'react';
import { AiFillInfoCircle } from 'react-icons/ai';

const DemoWarning = (): ReactElement => {
  return (
    <div id='demo-warning'>
      <AiFillInfoCircle />
      <div className='thick header-text'>This is just a demo site</div>
    </div>
  );
};

export default DemoWarning;
