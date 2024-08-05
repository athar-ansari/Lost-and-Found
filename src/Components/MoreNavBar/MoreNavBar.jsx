import React from "react";
import Btn from "../Button/Btn";
import { Link } from "react-router-dom";
import image from "../../Static/logo.png";
const MoreNavBar = () => {
  return (
    <>
      <div className="bg-[#F0EFF1] h-20">
        <div className="main flex font-extrabold font-serif justify-between  ">
          <div className="logo flex pt-5 ml-32 font-lora leading-none font-extrabold italic lg:ml-32 lg:mt-2 xs:ml-20   ">
            <div className="logo-img -mt-1 -ml-14">
              <img
                src={image}
                className="bg-transparent h-14 lg:h-10 "
                alt="logo-img"
              />
            </div>
            <div className="text-[1.5rem] lg:text-base">
              <span className="mr-4 lg:mr-6">Lost</span>
              <br />
              <span className="ml-[4.1rem] -mt-2 absolute lg:ml-11 lg:-mt-3">
                Found
              </span>
            </div>
            <div className="-mt-2 -ml-8 opacity-35 text-[3.80rem] lg:text-4xl lg:mt-0">
              &
            </div>
          </div>
          <div className="btn mt-5   mr-28 xs:mr-8">
            <Link to="/">
              <Btn text="Back" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MoreNavBar;
