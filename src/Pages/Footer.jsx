import { HoverCardDemo } from "@/Components/HoverCard/HoverCardDemo";
import React from "react";

const Footer = () => {
  return (
    <>
      <hr className="border-1 border-black mx-10 mt-8  xs:mx-4  xs:mt-2" />
      <p className="text-base flex justify-center items-center p-2 font-lora font-medium xs:text-[0.5rem] xs:p-2  ">
        Lost & Found, © 2024 Inc. All rights reserved, Design By{" "}
        <a href="https://www.atharansari.me/">
          <HoverCardDemo />
        </a>
      </p>
    </>
  );
};

export default Footer;
