import './index.scss';

import ReactLoading from 'react-loading';

interface GigLoaderProps {
  color?: string,
  height?: string,
  type?: any, // TODO - import @types/react-loading
  width?: string,
}

const GigLoader = (props: GigLoaderProps) => (
  <ReactLoading
    className='gig-loader'
    color={props.color || '#083F89'}
    height={props.height || '20%'}
    type={props.type || 'cylon'}
    width={props.width || '20%'}
  />
);

export default GigLoader;
