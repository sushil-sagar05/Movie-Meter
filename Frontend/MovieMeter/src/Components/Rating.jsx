import React, { useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';

const StarRating = ({ totalStars = 5, onRatingChange }) => {
  const [rating, setRating] = useState(0);

  const handleClick = (index) => {
    const newRating = index + 1;
    setRating(newRating);
    onRatingChange(newRating); // Send the new rating value to the parent component
  };

  return (
    <div className="flex space-x-1"style={{ overflowX: 'hidden' }}>
      {[...Array(totalStars)].map((_, index) => (
        <div
          key={index}
          onClick={() => handleClick(index)}
          className="cursor-pointer"
        >
          {rating > index ? (
            <FaStar className="text-yellow-500 text-2xl" />
          ) : (
            <FaRegStar className="text-gray-400 text-2xl" />
          )}
        </div>
      ))}
    </div>
  );
};

export default StarRating;
