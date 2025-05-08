import React, { useState } from "react";
import { LuBolt } from "react-icons/lu";

export default function RateEmployee({ count = 5 }) {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(0);

  const handleClick = (currentId) => {
    setRating(currentId);
  };

  const handleMouseEnter = (currentId) => {
    setHover(currentId);
  };

  const handleMouseLeave = () => {
    setHover(rating);
  };

  return (
    <div className="flex items-center justify-center mt-10 text-5xl space-x-1">
      {[...Array(count)].map((_, index) => {
        index += 1;
        return (
          <LuBolt
            className={`${
              index <= (hover || rating) ? "text-logo" : ""
            } cursor-pointer hover:scale-105 transition duration-200 `}
            key={index}
            onClick={() => handleClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          />
        );
      })}
    </div>
  );
}
