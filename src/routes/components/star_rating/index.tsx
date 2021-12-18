import './index.scss';

import { ReactElement, useState } from 'react';
import { FaStar } from 'react-icons/fa';

type StarRatingProps = {
  rating: number,
  updateRating: (rating: number) => void,
};

const StarRating = (props: StarRatingProps): ReactElement => {
  const [hoverRating, setHoverRating] = useState(0);
  const finalRating = hoverRating || props.rating;

  return (
    <div className='star-rating-container'>
      <button
        className={`rating-star ${1 <= finalRating ? 'filled' : ''}`}
        onClick={() => props.updateRating(1)}
        onMouseEnter={() => setHoverRating(1)}
        onMouseLeave={() => setHoverRating(0)}
      >
        <FaStar />
      </button>
      <button
        className={`rating-star ${2 <= finalRating ? 'filled' : ''}`}
        onClick={() => props.updateRating(2)}
        onMouseEnter={() => setHoverRating(2)}
        onMouseLeave={() => setHoverRating(0)}
      >
        <FaStar />
      </button>
      <button
        className={`rating-star ${3 <= finalRating ? 'filled' : ''}`}
        onClick={() => props.updateRating(3)}
        onMouseEnter={() => setHoverRating(3)}
        onMouseLeave={() => setHoverRating(0)}
      >
        <FaStar />
      </button>
      <button
        className={`rating-star ${4 <= finalRating ? 'filled' : ''}`}
        onClick={() => props.updateRating(4)}
        onMouseEnter={() => setHoverRating(4)}
        onMouseLeave={() => setHoverRating(0)}
      >
        <FaStar />
      </button>
      <button
        className={`rating-star ${5 <= finalRating ? 'filled' : ''}`}
        onClick={() => props.updateRating(5)}
        onMouseEnter={() => setHoverRating(5)}
        onMouseLeave={() => setHoverRating(0)}
      >
        <FaStar />
      </button>
    </div>
  );
}

export default StarRating;
