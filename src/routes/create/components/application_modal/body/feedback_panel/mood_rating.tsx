import { ReactElement } from 'react';
import { FaRegFrownOpen, FaRegFrown, FaRegMeh, FaRegSmile, FaRegGrinStars } from 'react-icons/fa';

type MoodRatingProps = {
  mood: number,
  updateMood: (mood: number) => void,
};

const MoodRating = (props: MoodRatingProps): ReactElement => {
  return (
    <div id='mood-rating-container'>
      <FaRegFrownOpen
        className={`terrible-rating rating-icon ${props.mood === 1 ? 'active' : ''}`}
        onClick={() => props.updateMood(1)}
      />
      <FaRegFrown
        className={`bad-rating rating-icon ${props.mood === 2 ? 'active' : ''}`}
        onClick={() => props.updateMood(2)}
      />
      <FaRegMeh
        className={`meh-rating rating-icon ${props.mood === 3 ? 'active' : ''}`}
        onClick={() => props.updateMood(3)}
      />
      <FaRegSmile
        className={`good-rating rating-icon ${props.mood === 4 ? 'active' : ''}`}
        onClick={() => props.updateMood(4)}
      />
      <FaRegGrinStars
        className={`excellent-rating rating-icon ${props.mood === 5 ? 'active' : ''}`}
        onClick={() => props.updateMood(5)}
      />
    </div>
  );
};

export default MoodRating;
