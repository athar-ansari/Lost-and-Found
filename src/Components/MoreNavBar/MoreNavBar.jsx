import React from "react";
import Btn from "../Button/Btn";
import { Link } from "react-router-dom";
import image1 from "../../Static/logolaptop.png";
import image2 from "../../Static/logomobile.png";
const MoreNavBar = () => {
  return (
    <>
      <div className="bg-[#F0EFF1] h-20 overflow-hidden  ">
        <div className="flex font-extrabold font-serif justify-between  ">
          <div className=" pt-5 ml-20   lg:ml-16 lg:mt-2 xs:ml-3 xs:mt-1   ">
            <img
              src={image1}
              className="bg-transparent h-14 lg:h-10 xs:hidden  "
              alt="logo-img"
            />
            <img
              src={image2}
              className="bg-transparent  hidden xs:h-10   xs:block "
              alt="logo-img"
            />
          </div>
          <div className="mt-5   mr-28 xs:mr-8 xs:mt-6">
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
