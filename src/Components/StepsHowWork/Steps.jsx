import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import login from "../../Static/login.jpg";
import choice from "../../Static/choice.jpg";
import messages from "../../Static/waiting.jpg";
import details from "../../Static/details.jpg";

const steps = [
  {
    title: "Create an account & log-in.",
    image: login,
  },
  {
    title: "Fill out the form for lost or found items.",
    image: choice,
  },
  {
    title: "Share your details and social links.",
    image: details,
  },
  {
    title: "Wait for responses or messages.",
    image: messages,
  },
];

const Steps = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="  px-4 gap-8 mb-3 flex justify-center flex-wrap lg:gap-8 lg:px-2 ">
      {steps.map((step, index) => (
        <StepCard
          key={index}
          step={step}
          index={index}
          isLargeScreen={isLargeScreen}
        />
      ))}
    </div>
  );
};

const StepCard = ({ step, index, isLargeScreen }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start({ y: 0, opacity: 1 });
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ y: 50, opacity: 0 }}
      animate={controls}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className={`bg-[#F0EFF1] outline-double p-4 rounded-lg text-center relative w-72 group ${
        index > 0 && isLargeScreen ? "lg:mt-12" : ""
      }`}
      style={{
        marginTop: index > 0 && isLargeScreen ? `${index * 3}rem` : "0",
      }}
    >
      <p className="text-lg font-bold mb-8">{step.title}</p>
      <img
        src={step.image}
        alt={step.title}
        className="w-52 h-52 mx-auto mb-9 lg:mb-14  xs:mb-20"
      />
      <div className="absolute bottom-1 right-4 text-7xl font-bold text-gray-300 group-hover:text-blue-800">
        {index + 1}
      </div>
    </motion.div>
  );
};

export default Steps;
