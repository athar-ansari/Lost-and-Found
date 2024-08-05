import React from "react";
import image from "../../Static/loading.gif";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50 backdrop-blur-3xl">
      <img src={image} className=" " alt="loading" />
    </div>
  );
};

export default Loading;
