import React from "react";
import ImageCarousel from "../Components/ImageCarousel/ImageCarousel";

const About = () => {
  return (
    <>
      <hr className="border-1 border-black mx-10 my-12" />
      <div id="about" className="texting bg-[#F0EFF1] font-lora">
        <h1 className="mt-20 text-7xl  font-bold italic flex justify-center items-center xs:text-4xl xs:mt-16">
          Explore Our Mission
        </h1>
        <p className="text-xl flex justify-center items-center p-2 underline underline-offset-8 xs:text-sm">
          Specially designed for AEC Student
        </p>
        <div className="flex flex-col  items-center p-4">
          <div className="w-full ">
            <ImageCarousel />
          </div>
          <p className="text-lg w-9/12  mt-8 text-wrap text-center  xs:w-full xs:text-xl">
            Our "Lost and Found" website is dedicated to helping students
            effortlessly recover lost items and return found ones.
            <br />
            Our mission is to create a seamless and secure system that connects
            students and ensures lost belongings are quickly reunited with their
            owners.
            <br />
            Easily browse through items posted by fellow students or promptly
            report your lost items for immediate assistance.
            <br />
            Let's build a supportive environment where no lost item remains
            unfound for long.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
