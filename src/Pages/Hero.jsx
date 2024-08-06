import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PreLoader from "@/Components/Loading/PreLoader";
import image from "../Static/hero.png";
import ReportBtn from "@/Components/ReportBtn/ReportBtn";
import { ToastContainer } from "../Components/ui/use-toast";
import { Navbar } from "@/Components/Navbar/Navbar";
import MobileNavigation from "../Components/MobileNavigation/MobileNavigation";

const textAnimation = {
  container: {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.04 * i },
    }),
  },
  child: {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  },
};

const AnimatedText = ({ text, className }) => {
  const letters = text.split("");

  return (
    <motion.h1
      className={className}
      variants={textAnimation.container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={textAnimation.child}>
          {letter}
        </motion.span>
      ))}
    </motion.h1>
  );
};

const Hero = () => {
  const [loading, setLoading] = useState(
    () => !JSON.parse(sessionStorage.getItem("visitedBefore")) || false
  );

  useEffect(() => {
    sessionStorage.setItem("visitedBefore", JSON.stringify(true));
  }, []);

  const handleComplete = () => {
    setLoading(false);
  };

  const [showMobileNav, setShowMobileNav] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [scrollDiff, setScrollDiff] = useState(0);
  const [isNearBottom, setIsNearBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const diff = currentScrollTop - lastScrollTop;

      if (Math.abs(diff) > 10) {
        // Only update state if the scroll difference exceeds 10
        setScrollDiff(diff);
        setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
      }

      // Check if the user is near the bottom of the page
      setIsNearBottom(currentScrollTop + windowHeight >= documentHeight - 100);
    };

    const throttleHandleScroll = throttle(handleScroll, 200); // Throttle scroll handler to run every 200ms

    window.addEventListener("scroll", throttleHandleScroll);

    return () => {
      window.removeEventListener("scroll", throttleHandleScroll);
    };
  }, [lastScrollTop]);

  useEffect(() => {
    if (isNearBottom) {
      setShowMobileNav(false);
    } else if (scrollDiff > 0) {
      // Scrolling down
      setShowMobileNav(false);
    } else if (scrollDiff < 0) {
      // Scrolling up
      setShowMobileNav(true);
    }
  }, [scrollDiff, isNearBottom]);

  const throttle = (func, limit) => {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  };

  return (
    <>
      {loading ? (
        <PreLoader onComplete={handleComplete} />
      ) : (
        <>
          {/* Navbar */}
          <Navbar />

          <div className="mt-8 text-9xl font-lora font-bold italic lg:text-7xl lg:mt-16 xs:text-5xl xs:mt-1">
            <div className="text-1 flex p-1 gap-40 lg:gap-1 lg:-ml-20 lg:text-6xl xs:text-4xl">
              <AnimatedText
                text="Find"
                className="ml-36 -mb-8 xl:-mb-6 xl:ml-44 lg:-mr-36 xs:ml-24 xs:-mb-2"
              />
              <p className="text-base text-wrap mt-10 w-72 ml-96 lg:mt-5 xl:ml-72 lg:text-xs lg:mr-20 xs:hidden">
                Join our community to reconnect with lost belongings and report
                found items.
              </p>
            </div>

            <div className="text-2 lg:-ml-24 lg:text-6xl xs:-ml-64 xs:text-4xl">
              <AnimatedText
                text="or Report"
                className="ml-72 -mb-3 xl:-mb-1 xl:ml-[19rem] xs:mb-1"
              />
            </div>

            <div className="text-3 lg:-ml-44 lg:text-6xl xs:-ml-[27rem] xs:text-4xl">
              <AnimatedText
                text="Lost Items"
                className="ml-[40rem] xl:ml-[35rem]"
              />
            </div>
          </div>

          {/* report Button for small/mobile screen  -- START */}
          <div className="hidden xs:block bg-transparent absolute -mt-20 z-50 top-[25rem] right-6">
            <ReportBtn />
            <ToastContainer />
          </div>
          {/* report Button for small/mobile screen  -- END */}

          {/* Image */}
          <div className="img-hero flex justify-center items-center flex-grow mt-12 lg:p-9 xs:mt-2 xs:p-6">
            <motion.img
              src={image}
              className="rounded-3xl shadow-2xl w-[1200px] xl:w-[1020px]"
              alt="img-hero"
              initial={{ y: -window.innerHeight, scale: 1.5 }}
              animate={{ y: 0, scale: 1 }}
              transition={{ duration: 1 }}
            />
          </div>

          {/* Mobile Navigation */}
          <div className="hidden xs:block">
            <AnimatePresence>
              {showMobileNav && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }} // Adjust the duration for slower animation
                >
                  <MobileNavigation />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </>
      )}
    </>
  );
};

export default Hero;
