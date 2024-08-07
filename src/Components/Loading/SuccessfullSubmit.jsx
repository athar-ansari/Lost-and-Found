import React from "react";
import image from "../../Static/ThankYou.gif";
const SuccessfullSubmit = () => {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50 backdrop-blur-3xl">
        <img src={image} className="h-full w-full " alt="ThankYou" />
      </div>
    </>
  );
};

export default SuccessfullSubmit;
