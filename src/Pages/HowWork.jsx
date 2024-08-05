import Steps from "@/Components/StepsHowWork/Steps";
import React from "react";

const HowWork = () => {
  return (
    <>
      <hr className="border-1 border-black   mx-10 my-12" />
      <div className="font-lora">
        <h1 className="mt-12 text-7xl  font-bold   flex justify-center items-center xs:text-4xl xs:-mt-4  ">
          How does it work?
        </h1>
        <Steps />
      </div>
    </>
  );
};

export default HowWork;
