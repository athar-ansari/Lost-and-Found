import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

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
            src="https://res.cloudinary.com/dgg8xe2o3/image/upload/v1722928918/about1_dpylw4.png"
            className="ml-48 shadow-xl w-1/6 mt-8 lg:w-1/4 xs:w-1/3 lg:ml-20 xs:ml-8"
            alt="image1"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 2 }}
          />
          <motion.img
            src="https://res.cloudinary.com/dgg8xe2o3/image/upload/v1722928918/about2_ei0kfv.png"
            className="mr-48 shadow-xl w-1/6 mt-8 lg:w-1/4 xs:w-1/3 lg:mr-20 xs:mr-8"
            alt="image2"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 2 }}
          />
        </div>
        <div className="middle flex justify-center items-center">
          <motion.img
            src="https://res.cloudinary.com/dgg8xe2o3/image/upload/v1722928917/hero_nvb6p6.png"
            className="w-1/4 -mt-48 lg:w-5/12 xs:w-1/2 rounded-xl shadow-2xl z-[98]"
            alt="image"
            initial={{ scale: 0.5 }}
            animate={controls}
          />
        </div>
        <div className="lower-pic flex justify-between mb-10 xs:-mt-10">
          <motion.img
            src="https://res.cloudinary.com/dgg8xe2o3/image/upload/v1722928919/about3_lu4ryn.png"
            className="ml-48 shadow-xl w-1/6 -mt-48 lg:w-1/4 xs:w-1/3 lg:ml-20 xs:ml-8 xs:-mt-36"
            alt="image3"
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{ duration: 2 }}
          />
          <motion.img
            src="https://res.cloudinary.com/dgg8xe2o3/image/upload/v1722928917/about4_rzgmsg.png"
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
