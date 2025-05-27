import { useState } from "react";
import { FaStar } from "react-icons/fa6";

export default function RateEmployee({ count = 5, rating, setRating }) {
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
    <div className="flex items-center justify-center text-5xl space-x-1">
      {[...Array(count)].map((_, index) => {
        index += 1;
        return (
          <FaStar
            className={`${
              index <= (hover || rating)
                ? "text-yellow-300"
                : "text-neutral-700"
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
