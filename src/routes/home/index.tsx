import './index.scss';

import { ReactElement } from 'react';

import DemoWarning from 'components/demo_warning';
import logo from 'assets/icons/logo.png';
import { SearchProvider } from 'providers/search';
import SubmitButton from 'routes/home/submit_button';
import SwitchButton from 'routes/home/switch_button';
import SearchPanel from 'routes/components/search/panel';

const HomePage = (): ReactElement => {
  return (
    <div id='home-page' >
      <DemoWarning />
      <SearchProvider>
        <div id='main-search-form-container'>
          <div className='search-form-item' id='search-form-name-and-logo'>
            <img alt='logo' src={logo} />
            <span className='bold large-title-text'>Gig Search</span>
          </div>
          <div className='search-form-item header-text' id='search-form-tag-line'>
            The ultimate tool for finding your next big gig
          </div>
          <SearchPanel />
          <SubmitButton />
          <div className='search-form-item header-text' id='search-form-switch-portal'>
            Looking to hire? <SwitchButton /> to our employer portal instead
          </div>
        </div>
      </SearchProvider>
    </div>
  )
}

export default HomePage;
