import React from "react";
import { Button } from "../ui/button";
import image from "../../Static/myprofile.jpg";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

export function HoverCardDemo() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" className="font-extrabold italic">
          @athar
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="h-32 w-32 ">
            <img
              src={image}
              alt="Avatar"
              className=" object-cover  rounded-full"
            />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold font-lora">Athar</h4>
            <p className="text-sm   ">
              Passionate and dedicated full stack web developer & creative
              designer from India.
            </p>
            <p className="text-sm">
              Explore my work in this project. Thanks for visiting!
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
