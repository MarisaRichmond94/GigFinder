import './index.scss';

import { ReactElement } from 'react';

import GigButton from 'components/gig_button';
import { calculateDurationSincePosted, populateJobRequirements } from 'libs/gigs';
import SearchItemHeader from 'routes/components/search/item/header';
import { Gig } from 'types';

type SearchItemProps = {
  handleToggleFavoriteGig: () => void,
  item: Gig,
  isFavorite: boolean,
  learnMoreAboutGig: (gigId: string) => void,
};

const SearchItem = (props: SearchItemProps): ReactElement => {
  const { id, employer, city, state, rating, createdAt, requirements, title } = props.item;

  return (
    <div className='search-item'>
      <SearchItemHeader
        employer={employer}
        handleToggleFavoriteGig={props.handleToggleFavoriteGig}
        id={id}
        isFavorite={props.isFavorite}
        rating={rating}
        title={title}
      />
      <div className='sub-header-row sub-header-text text medium-grey'>
        {city}, {state}
      </div>
      <div className='requirements-row paragraph-text'>
        {populateJobRequirements(id, requirements)}
      </div>
      <div className='posted-row sub-header-text text medium-grey'>
        Posted {calculateDurationSincePosted(createdAt)} ago
      </div>
      <div className='text-center'>
        <GigButton
          classNames='primary-blue dark-background sub-header-text'
          onClick={() => props.learnMoreAboutGig(id)}
          text='Learn More'
        />
      </div>
    </div>
  );
};

export default SearchItem;
