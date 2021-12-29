import './index.scss';

import { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';

import logo from 'assets/icons/logo.png';
import DemoWarning from 'components/demo_warning';
import GigButton from 'components/gig_button';
import { useViewport } from 'hooks/useViewport';
import { useSearch } from 'providers/search';
import SearchPanel from 'routes/components/search/panel';
import settings from 'settings';

const HomePage = (): ReactElement => {
  // provider variables and functions
  const { onSearchFormSubmit } = useSearch();
  // hook variables
  const history = useHistory();
  const { width } = useViewport();
  // derived variables
  const isMobileView = width < settings.MIN_DESKTOP_WIDTH;

  const SwitchButton = (
    <GigButton
      classNames='thick header-text primary-blue text'
      id='search-form-switch-button'
      onClick={() => history.push(settings.CREATE_ROUTE)}
      text='Switch'
    />
  );

  return (
    <div id='home-page' >
      <DemoWarning />
      <div id='main-search-form-container'>
        <div id='search-form-name-and-logo'>
          <img alt='main-logo' src={logo} />
          <span className={`bold ${isMobileView ? 'sub-title-text' : 'large-title-text'}`}>
            Gig Finder
          </span>
        </div>
        <div className='header-text text off-white text-center'>
          The ultimate tool for finding your next big gig
        </div>
        <SearchPanel />
        <GigButton
          classNames={`primary-blue dark-background ${isMobileView ? 'sub-' : ''}header-text`}
          id='search-form-submit-button'
          onClick={onSearchFormSubmit}
          text='Find My Dream Gig'
        />
        <div className='header-text text off-white text-center' id='switch-portals-prompt'>
          Looking to hire? {SwitchButton} to our employer portal instead
        </div>
      </div>
    </div>
  );
};

export default HomePage;
