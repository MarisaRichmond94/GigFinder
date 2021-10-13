import './index.scss';

import { ReactElement } from 'react';

import GigButton from 'components/gig_button';

import calculateDurationSincePosted from '../utils/calculateDurationSincePosted';
import { SearchItemProps } from './types';
import SearchItemHeader from './header';

const SearchItem = (props: SearchItemProps): ReactElement => {
  const { id, company, city, state, rating, created_at, requirements, title } = props.item;

  const populateJobRequirements = (id: string, requirements: string): ReactElement => {
    const bulletpoints = requirements.split('.');
    bulletpoints.pop();
    return (
      <ul className='job-requirements-list'>
        {
          bulletpoints.map(
            (bulletpoint, index) => <li key={`${id}-requirement-${index}`}>{bulletpoint}</li>
          )
        }
      </ul>
    );
  }

  return (
    <div className='search-item'>
      <SearchItemHeader company={company} id={id} rating={rating} title={title} />
      <div className='sub-header-row sub-header-text'>
        {city}, {state}
      </div>
      <div className='requirements-row paragraph-text'>
        {populateJobRequirements(id, requirements)}
      </div>
      <div className='posted-row sub-header-text'>
        Posted {calculateDurationSincePosted(created_at)} ago
      </div>
      <div className='button-row text-center'>
        <GigButton
          classNames='primary-blue-gig-button sub-header-text'
          id={`learn-more-button-${id}`}
          onClick={() => console.log('Learn More')}
          text='Learn More'
        />
      </div>
    </div>
  );
}

export default SearchItem;