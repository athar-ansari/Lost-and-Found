import React, { useState } from "react";
import MobileNavigation from "../MobileNavigation/MobileNavigation";
import image from "../../Static/logo.png";
import ReportBtn from "../ReportBtn/ReportBtn";
import { ToastContainer } from "../ui/use-toast";
import UserStatus from "./UserStatus";

export const Navbar = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div id="home" className="navbar bg-[#F0EFF1] h-20 ">
      <div className="flex font-extrabold font-serif justify-evenly gap-10 lg:gap-8 xs:gap-2 ">
        <div className="logo flex pt-5 -ml-28 font-lora leading-none font-extrabold italic lg:-ml-14 lg:mt-2 xs:mr-2">
          <div className="logo-img -mt-1 -ml-14  ">
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

        {/* This Navigation For Large Screen ,top of the Screen */}
        <div className="ml-48 lg:ml-14 md:-ml-10 xs:hidden">
          <MobileNavigation />
        </div>

        <div className="flex gap-10 -mr-8 lg:-mr-2 md:-mr-0 md:gap-0 xs:ml-1">
          <div className="mt-7 lg:hidden">
            <ReportBtn
              isDialogOpen={isDialogOpen}
              setIsDialogOpen={setIsDialogOpen}
            />
          </div>
          <ToastContainer />
          <UserStatus />
        </div>
      </div>
    </div>
  );
};
