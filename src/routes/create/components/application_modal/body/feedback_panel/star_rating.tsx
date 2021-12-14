import { ReactElement, useState } from 'react';
import { FaStar } from 'react-icons/fa';

type StarRatingProps = {
  rating: number,
  type: 'cultural' | 'technical',
  updateRating: (type: 'cultural' | 'technical', rating: number) => void,
};

const StarRating = (props: StarRatingProps): ReactElement => {
  const [hoverRating, setHoverRating] = useState(0);
  const finalRating = hoverRating || props.rating;

  const updateHoverRating = (rating: number): void => {
    setHoverRating(rating);
  };

  return (
    <div className='star-rating-container'>
      <button
        className={`rating-star ${1 <= finalRating ? 'filled' : ''}`}
        onClick={() => props.updateRating(props.type, 1)}
        onMouseEnter={() => updateHoverRating(1)}
        onMouseLeave={() => setHoverRating(0)}
      >
        <FaStar />
      </button>
      <button
        className={`rating-star ${2 <= finalRating ? 'filled' : ''}`}
        onClick={() => props.updateRating(props.type, 2)}
        onMouseEnter={() => updateHoverRating(2)}
        onMouseLeave={() => setHoverRating(0)}
      >
        <FaStar />
      </button>
      <button
        className={`rating-star ${3 <= finalRating ? 'filled' : ''}`}
        onClick={() => props.updateRating(props.type, 3)}
        onMouseEnter={() => updateHoverRating(3)}
        onMouseLeave={() => setHoverRating(0)}
      >
        <FaStar />
      </button>
      <button
        className={`rating-star ${4 <= finalRating ? 'filled' : ''}`}
        onClick={() => props.updateRating(props.type, 4)}
        onMouseEnter={() => updateHoverRating(4)}
        onMouseLeave={() => setHoverRating(0)}
      >
        <FaStar />
      </button>
      <button
        className={`rating-star ${5 <= finalRating ? 'filled' : ''}`}
        onClick={() => props.updateRating(props.type, 5)}
        onMouseEnter={() => updateHoverRating(5)}
        onMouseLeave={() => setHoverRating(0)}
      >
        <FaStar />
      </button>
    </div>
  );
}

export default StarRating;
