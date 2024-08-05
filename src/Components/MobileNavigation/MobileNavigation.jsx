import React, { useState, useEffect, useRef } from "react";

// Navigation logo for Mobile Device
import homeImage from "../../Static/home.png";
import foundImage from "../../Static/report.png";
import lostImage from "../../Static/loss.png";
import aboutImage from "../../Static/why.png";

const MobileNavigation = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
  const navItems = ["Home", "Found", "Lost", "Why"];
  const navRefs = useRef([]);
  const isNavigatingRef = useRef(false);

  const idMapping = {
    Home: "home",
    Found: "found",
    Lost: "lost",
    Why: "about",
  };

  const images = {
    Home: homeImage,
    Found: foundImage,
    Lost: lostImage,
    Why: aboutImage,
  };

  useEffect(() => {
    const updateIndicator = () => {
      const activeItem = navRefs.current[activeIndex];
      if (activeItem) {
        setIndicatorStyle({
          width: activeItem.offsetWidth,
          left: activeItem.offsetLeft,
        });
      }
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);

    return () => {
      window.removeEventListener("resize", updateIndicator);
    };
  }, [activeIndex]);

  useEffect(() => {
    const handleScroll = (entries) => {
      if (isNavigatingRef.current) return;

      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      if (visibleEntries.length === 0) return;

      const currentEntry = visibleEntries[visibleEntries.length - 1];
      const currentIndex = navItems.findIndex(
        (item) => idMapping[item] === currentEntry.target.id
      );

      if (currentIndex !== -1) {
        setActiveIndex(currentIndex);
      }
    };

    const observer = new IntersectionObserver(handleScroll, {
      threshold: [0.5, 1.0],
    });

    Object.values(idMapping).forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      Object.values(idMapping).forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [idMapping, navItems]);

  const handleNavigation = (index, id) => {
    setActiveIndex(index);
    isNavigatingRef.current = true;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        isNavigatingRef.current = false;
      }, 800);
    }
  };

  return (
    <div className="navigation flex justify-center mt-5 ">
      <div
        className="h-14 w-[23.5rem] flex items-center justify-center rounded-full  fixed z-10  xs:w-[16rem] xs:h-[3.9rem]   bg-navigationBgPC xs:bg-navigationBgMobile  xs:bottom-8"
        style={{
          // background: "rgba(0, 0, 0, 0.43)", //mobile device
          // background: " rgba(255, 255, 255, 0.43)", // Large Screen
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(2.7px)",
          WebkitBackdropFilter: "blur(2.7px)",
        }}
      >
        <ul className="flex gap-9 font-lora text-2xl font-extrabold relative">
          <div
            className="nav-indicator xs:hidden absolute h-10 bg-black rounded-full -mt-1 transition-all duration-700 ease-in-out "
            style={{
              width: `${indicatorStyle.width + 22}px`,
              left: `${indicatorStyle.left - 12}px`,
            }}
          ></div>

          {/* This Navigation Style Specific For Small/Mobile Screen  ---Start */}
          <div
            className="nav-indicator-mobile hidden lg:hidden xs:block absolute h-10 bg-black rounded-full -mt-1 transition-all duration-700 ease-in-out xs:-mt-2  xs:h-11 xs:w-11 "
            style={{
              left: `${indicatorStyle.left - 8}px`,
            }}
          ></div>
          {/* This Navigation Style Specific For Small/Mobile Screen  ---End */}

          {navItems.map((item, index) => (
            <li
              key={index}
              ref={(el) => (navRefs.current[index] = el)}
              className={`cursor-pointer ${
                activeIndex === index ? "text-white" : "text-black"
              } z-10`}
              onClick={() => handleNavigation(index, idMapping[item])}
            >
              <span className="xs:hidden">{item}</span>
              <span className="hidden xs:inline">
                <img src={images[item]} alt={item} className="w-7 h-7" />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MobileNavigation;
