import React from "react";
import Hero from "./Hero";
import FoundItems from "./FoundItems";
import LostItems from "./LostItems";
import About from "./About";
import Footer from "./Footer";
import HowWork from "./HowWork";

const Home = () => {
  return (
    <>
      <div className="home bg-[#F0EFF1] h-full w-full">
        {/* Text Area */}
        <Hero />

        {/* Text Area */}
        <HowWork />

        {/* Found Items */}
        <FoundItems />

        {/* Lost Items */}
        <LostItems />

        {/* Why ? */}
        <About />

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Home;
