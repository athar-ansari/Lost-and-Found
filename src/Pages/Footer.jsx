import { HoverCardDemo } from "@/Components/HoverCard/HoverCardDemo";
import React from "react";

const Footer = () => {
  return (
    <>
      <hr className="border-black mx-10 my-4 xs:my-0 " />
      <p className="text-base flex justify-center items-center p-2 font-lora font-medium xs:text-xs xs:p-3 xs:-ml-[0.35rem]">
        Lost & Found, © 2024 Inc. All rights reserved, Design By{" "}
        <a href="https://www.atharansari.me/" className="xs:-ml-[0.8rem]">
          <HoverCardDemo />
        </a>
      </p>
    </>
  );
};

export default Footer;
