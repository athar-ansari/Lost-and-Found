import React, { useState, useEffect } from "react";
import Btn from "../Components/Button/Btn";
import RecentLostItems from "@/Components/RecentItems/RecentLostItems";
import { Link } from "react-router-dom";
import { useToast, ToastAction } from "@/Components/ui/use-toast";
import { useNavigate } from "react-router-dom";
const LostItems = () => {
  const { toast, dismiss } = useToast();
  const [toastId, setToastId] = useState(null);
  const navigate = useNavigate();
  const isSignedIn = localStorage.getItem("isLogin") === "true";

  const handleShowMoreClick = (e) => {
    if (!isSignedIn) {
      e.preventDefault(); // Prevent the default link behavior
      const id = toast({
        title: "Authentication Required",
        description: "You must be logged in to view this content.",
        action: (
          <ToastAction
            className="font-bold"
            altText="Login"
            onClick={() => {
              navigate("/sign-in");
            }}
          >
            Login
          </ToastAction>
        ),
      }).id;
      setToastId(id);
    }
  };
  useEffect(() => {
    if (toastId) {
      const timer = setTimeout(() => {
        dismiss(toastId);
        setToastId(null);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [toastId, dismiss]);
  return (
    <>
      <hr className="border-1 border-black mx-10 mt-8  lg:mx-6 xs:mx-4  xs:mt-5" />
      <div id="lost" className="found-items font-lora overflow-hidden">
        <h1 className="mt-20 text-7xl  font-bold italic flex justify-center items-center lg:text-6xl sm:text-[2.7rem]  xs:text-2xl xs:mt-4 ">
          Report What You've Lost{" "}
        </h1>
        <p className="text-xl flex justify-center items-center p-2 underline underline-offset-8 sm:text-base xs:text-[0.58rem] ">
          Promptly report lost items for immediate action by authorities.
        </p>
        <br />
        <div className="w-full px-4 mb-8 flex justify-center flex-wrap lg:px-10">
          <RecentLostItems />
        </div>
        {/* cards */}
        <div className="flex justify-center items-center">
          <Link to="/alllost" onClick={handleShowMoreClick}>
            <Btn text="Show more" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default LostItems;
