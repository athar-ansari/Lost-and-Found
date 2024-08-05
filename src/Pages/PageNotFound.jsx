import React from "react";
import { Link } from "react-router-dom";
import Btn from "../Components/Button/Btn";

const PageNotFound = () => {
  return (
    <>
      <div className="relative h-screen overflow-hidden bg-white font-lora">
        <div className=" text-7xl flex justify-center items-center mt-4 lg:mt-16 xs:mt-10">
          404
        </div>
        <img
          src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
          className="w-full h-full object-none xs:object-contain -mt-14 lg:-mt-28"
          alt="explore"
        />
        <div className=" w-96 xs:w-11/12   font-lora  -mt-40 absolute  left-1/2 transform -translate-x-1/2 -translate-y-12 lg:-mt-52 xs:-mt-44  ">
          <h2 className="mx-8 xs:mx-4 text-[2.45rem] italic xs:not-italic  xs:text-4xl">
            Look like you're lost
          </h2>
          <p className="ml-4 text-xl text-wrap xs:ml-3  xs:text-base">
            The page you are looking for is not available!
          </p>
        </div>

        <div className="flex-col -mt-16  absolute  left-1/2 transform -translate-x-1/2 -translate-y-12 lg:-mt-20 xs:-mt-20">
          <Link to="/">
            <Btn text="Go to Home" />{" "}
          </Link>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
