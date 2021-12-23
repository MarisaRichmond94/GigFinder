import { ReactElement } from 'react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';

const getDatePosted = (datePosted: string): string => {
  const dateParts = datePosted.split('.');
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  // @ts-ignore
  const postedDate = new Date(dateParts[0]);
  // @ts-ignore
  return postedDate.toLocaleDateString('en-US', options);
};

const getStars = (rating: number): ReactElement => {
  const reviewRating = rating % 1 === 0 ? `${rating}.0` : rating;
  const stars = [];
  const [wholeStars, isHalfStar] = reviewRating.toString().split('.');
  while (stars.length < parseInt(wholeStars)) {
    stars.push(<BsStarFill className='rating-star' key={`star-${stars.length + 1}`} />);
  }
  if (isHalfStar !== '0') {
    stars.push(<BsStarHalf className='rating-star' key={`star-${stars.length + 1}`} />);
  }
  while (stars.length < 5) {
    stars.push(<BsStar className='rating-star' key={`star-${stars.length + 1}`} />);
  }

  return <div className='rating-stars'>{stars}</div>;
};

export {
  getDatePosted,
  getStars,
};
