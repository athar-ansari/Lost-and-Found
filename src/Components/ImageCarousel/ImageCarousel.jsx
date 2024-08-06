import React, { useState, useEffect } from "react";

const ImageCarousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "https://res.cloudinary.com/dgg8xe2o3/image/upload/v1722928918/about1_dpylw4.png",
    "https://res.cloudinary.com/dgg8xe2o3/image/upload/v1722928918/about2_ei0kfv.png",
    "https://res.cloudinary.com/dgg8xe2o3/image/upload/v1722928919/about3_lu4ryn.png",
    "https://res.cloudinary.com/dgg8xe2o3/image/upload/v1722928917/about4_rzgmsg.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [images.length]);

  return (
    <div className="relative w-full h-64">
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
