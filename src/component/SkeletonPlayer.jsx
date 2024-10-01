import React, { useRef, useState } from "react";
import skeletonGif from "../assets/AiData/skeleton-animation.gif"; // Adjust the path as necessary

const SkeletonPlayer = () => {
  const gifRef = useRef(null);
  const [sliderValue, setSliderValue] = useState(50);

  const playSkeleton = () => {
    if (gifRef.current) {
      gifRef.current.src = "/path/to/skeleton.gif"; // Reset the GIF to play
    }
  };

  const stopSkeleton = () => {
    if (gifRef.current) {
      gifRef.current.src = ""; // Stop the GIF by setting the src to an empty string
    }
  };

  const handleSliderChange = (event) => {
    const value = event.target.value;
    setSliderValue(value);
    // Implement logic to handle slider change, e.g., adjust animation speed
  };

  return (
    <div className="skeleton-player">
      <img ref={gifRef} src={skeletonGif} alt="Skeleton Animation" />
      <div>
        <button onClick={playSkeleton}>Play</button>
        <button onClick={stopSkeleton}>Stop</button>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={sliderValue}
        onChange={handleSliderChange}
      />
    </div>
  );
};

export default SkeletonPlayer;
