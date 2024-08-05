import React, { useState, useEffect } from "react";
import image1 from "../../Static/about1.png";
import image2 from "../../Static/about2.png";
import image3 from "../../Static/about3.png";
import image4 from "../../Static/about4.png";

const ImageCarousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [image1, image2, image3, image4];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 2 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [images.length]);

  return (
    <div className="relative w-full h-64 ">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ${
            currentImageIndex === index ? "opacity-100" : "opacity-0"
          }`}
          alt={`carousel-${index}`}
        />
      ))}
    </div>
  );
};

export default ImageCarousel;
