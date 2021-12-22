import './index.scss';

import { ReactElement } from 'react';
import ReactLoading from 'react-loading';

interface GigLoaderProps {
  color?: string,
  height?: string,
  type?: any,
  width?: string,
}

const GigLoader = (props: GigLoaderProps): ReactElement => (
  <ReactLoading
    className='gig-loader'
    color={props.color || '#083F89'}
    height={props.height || '10%'}
    type={props.type || 'cylon'}
    width={props.width || '20%'}
  />
);

export default GigLoader;
