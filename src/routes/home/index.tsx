import './index.scss';

import { ReactElement } from 'react';

import logo from 'assets/icons/logo.png';
import DemoWarning from 'components/demo_warning';
import { useViewport } from 'hooks/useViewport';
import { SearchProvider } from 'providers/search';
import SearchPanel from 'routes/components/search/panel';
import SubmitButton from 'routes/home/submit_button';
import SwitchButton from 'routes/home/switch_button';

const HomePage = (): ReactElement => {
  const { width } = useViewport();

  return (
    <div id='home-page' >
      <DemoWarning />
      <SearchProvider>
        <div id='main-search-form-container'>
          <div className='search-form-item' id='search-form-name-and-logo'>
            <img alt='logo' src={logo} />
            <span className={`bold ${width > 749 ? 'large-title-text' : 'sub-title-text'}`}>
              Gig Search
            </span>
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
