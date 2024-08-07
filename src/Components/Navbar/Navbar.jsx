import React, { useState } from "react";
import MobileNavigation from "../MobileNavigation/MobileNavigation";
import image1 from "../../Static/logolaptop.png";
import image2 from "../../Static/logomobile.png";
import ReportBtn from "../ReportBtn/ReportBtn";
import { ToastContainer } from "../ui/use-toast";
import UserStatus from "./UserStatus";

export const Navbar = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div id="home" className="navbar bg-[#F0EFF1] h-20 overflow-hidden">
      <div className="flex font-extrabold font-serif justify-evenly gap-10 lg:gap-8 xs:gap-2 ">
        <div className="pt-5 -ml-56 xl:-ml-36  lg:-ml-32 lg:mt-3 xs:-ml-24 ">
          <img
            src={image1}
            className="bg-transparent h-14 lg:h-10  xs:hidden  "
            alt="logo-img"
          />
          <img
            src={image2}
            className="bg-transparent  hidden xs:h-10   xs:block "
            alt="logo-img"
          />
        </div>

        {/* This Navigation For Large Screen ,top of the Screen */}
        <div className="ml-48 lg:ml-14 md:-ml-10 xl:ml-10 xs:hidden">
          <MobileNavigation />
        </div>

        <div className="flex gap-10 -mr-8 xl:-mr-3 lg:-mr-2 md:-mr-0 md:gap-0 xs:ml-1">
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
