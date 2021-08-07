import './search.scss';

import { ReactElement } from 'react';

import logo from 'assets/icons/logo.png';
import { SearchFormProvider } from 'providers/search_form';
import SubmitButton from './buttons/submit_button';
import SwitchButton from './buttons/switch_button';
import WhatInput from './inputs/what';
import WhenInput from './inputs/when';
import WhereInput from './inputs/where';

const SearchForm = (): ReactElement => {
  return (
    <SearchFormProvider>
      <div id='main-search-form-container'>
        <div className='search-form-item' id='search-form-name-and-logo'>
          <img alt='logo' src={logo} />
          <span className='title-text'>Gig Search</span>
        </div>
        <div className='search-form-item paragraph-text' id='search-form-tag-line'>
          The ultimate tool for finding your next big gig
        </div>
        <div className='search-form-item search-form-input' id='search-form-what-input'>
          <WhatInput />
        </div>
        <div className='search-form-item search-form-input' id='search-form-where-input'>
          <WhereInput />
        </div>
        <div className='search-form-item search-form-input' id='search-form-when-input'>
          <WhenInput />
        </div>
        <div className='search-form-item' id='search-form-submit'>
          <SubmitButton />
        </div>
        <div className='search-form-item paragraph-text' id='search-form-switch-portal'>
          Looking to hire? <SwitchButton /> to our employer portal instead
        </div>
      </div>
    </SearchFormProvider>
  )
}

export default SearchForm;
