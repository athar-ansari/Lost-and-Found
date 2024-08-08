import Steps from "@/Components/StepsHowWork/Steps";
import React from "react";

const HowWork = () => {
  return (
    <>
      <hr className="border-1 border-black mx-10 mt-8 lg:mx-6  xs:mx-4  xs:mt-2" />
      <div className="font-lora overflow-hidden">
        <h1 className="mt-10 text-7xl  font-bold   flex justify-center items-center xl:text-6xl lg:text-5xl  xs:text-3xl xs:mt-4  mb-8  ">
          How does it work?
        </h1>
        <Steps />
      </div>
    </>
  );
};

export default HowWork;
