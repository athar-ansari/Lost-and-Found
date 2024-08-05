import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import image from "../../Static/hero.png";
import image1 from "../../Static/about1.png";
import image2 from "../../Static/about2.png";
import image3 from "../../Static/about3.png";
import image4 from "../../Static/about4.png";

const PreLoader = ({ onComplete }) => {
  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      await controls.start({
        scale: [0.5, 1.5, 1],
        transition: { duration: 2, ease: "easeInOut" },
      });
      onComplete();
    };
    sequence();
  }, [controls, onComplete]);

  return (
    <>
      <div className="h-screen flex flex-col justify-between overflow-hidden">
        <div className="upper-pic flex justify-between mt-5">
          <motion.img
            src={image1}
            className="ml-48 shadow-xl w-1/6 mt-8 lg:w-1/4 xs:w-1/3 lg:ml-20 xs:ml-8"
            alt="image1"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 2 }}
          />
          <motion.img
            src={image2}
            className="mr-48 shadow-xl w-1/6 mt-8 lg:w-1/4 xs:w-1/3 lg:mr-20 xs:mr-8"
            alt="image2"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 2 }}
          />
        </div>
        <div className="middle flex justify-center items-center">
          <motion.img
            src={image}
            className="w-1/4 -mt-48 lg:w-5/12 xs:w-1/2 rounded-xl shadow-2xl z-[98]"
            alt="image"
            initial={{ scale: 0.5 }}
            animate={controls}
          />
        </div>
        <div className="lower-pic flex justify-between mb-10 xs:-mt-10">
          <motion.img
            src={image3}
            className="ml-48 shadow-xl w-1/6 -mt-48 lg:w-1/4 xs:w-1/3 lg:ml-20 xs:ml-8 xs:-mt-36"
            alt="image3"
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ duration: 2 }}
          />
          <motion.img
            src={image4}
            className="mr-48 shadow-xl w-1/6 -mt-48 lg:w-1/4 xs:w-1/3 lg:mr-20 xs:mr-8 xs:-mt-36"
            alt="image4"
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ duration: 2 }}
          />
        </div>
      </div>
    </>
  );
};

export default PreLoader;
