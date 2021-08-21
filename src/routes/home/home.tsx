import './home.scss';

import { ReactElement } from 'react';

import DemoWarning from 'components/demo_warning/demo_warning';
import SearchForm from './search_form/search_form';
import logo from 'assets/icons/logo.png';
import { SearchFormProvider } from 'providers/search_form';
import SubmitButton from './submit_button/submit_button';
import SwitchButton from './switch_button/switch_button';

const HomePage = (): ReactElement => {
  return (
    <div id='home-page' >
      <DemoWarning />
      <SearchFormProvider>
        <div id='main-search-form-container'>
          <div className='search-form-item' id='search-form-name-and-logo'>
            <img alt='logo' src={logo} />
            <span className='large-title-text'>Gig Search</span>
          </div>
          <div className='search-form-item paragraph-text' id='search-form-tag-line'>
            The ultimate tool for finding your next big gig
          </div>
          <SearchForm />
          <SubmitButton />
          <div className='search-form-item paragraph-text' id='search-form-switch-portal'>
            Looking to hire? <SwitchButton /> to our employer portal instead
          </div>
        </div>
      </SearchFormProvider>
    </div>
  )
}

export default HomePage;
