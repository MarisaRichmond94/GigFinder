import './home.scss';

import { ReactElement } from 'react';

import DemoWarning from 'components/demo_warning/demo_warning';
import SearchForm from './form/search';

const HomePage = (): ReactElement => {
  return (
    <div id='home-page' >
      <DemoWarning />
      <SearchForm />
    </div>
  )
}

export default HomePage;
