import './header.scss';

import { ReactElement } from 'react';

type HeaderProps = {
}

const Header = (props: HeaderProps): ReactElement => {
  return (
    <div id='header' style={{ backgroundColor: '#5BA1C5' }}/>
  );
}

export default Header;
