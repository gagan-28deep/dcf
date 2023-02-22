import React, { useState } from "react";

const ImageSlider = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const currentImage = images[currentImageIndex];

  const handlePrevious = () => {
    setCurrentImageIndex(currentImageIndex - 1);
  };

  const handleNext = () => {
    setCurrentImageIndex(currentImageIndex + 1);
  };

  return (
    <div>
      <img src={currentImage} alt="slider image" />
      <button onClick={handlePrevious}>Previous</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default ImageSlider;