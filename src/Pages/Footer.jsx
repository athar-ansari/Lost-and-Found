import { HoverCardDemo } from "@/Components/HoverCard/HoverCardDemo";
import React from "react";

const Footer = () => {
  return (
    <>
      <hr className="border-1 border-black mx-10 mt-8 lg:mx-6 lg:mt-4 sm:mt-3 xs:mx-4  xs:mt-1" />
      <p className="text-base flex justify-center items-center p-2 font-lora font-medium  lg:text-sm xs:text-[0.55rem] xs:p-1  ">
        Lost & Found, © 2024 Inc. All rights reserved, Design By{" "}
        <a href="https://www.atharansari.me/">
          <HoverCardDemo />
        </a>
      </p>
    </>
  );
};

export default Footer;
