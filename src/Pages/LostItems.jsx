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
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [toastId, dismiss]);
  return (
    <>
      <hr className="border-1 border-black   mx-10 my-12 xs:my-8" />
      <div id="lost" className="found-items font-lora">
        <h1 className="mt-20 text-7xl  font-bold italic flex justify-center items-center xs:text-3xl xs:mt-8 ">
          Report What You've Lost{" "}
        </h1>
        <p className="text-xl flex justify-center items-center p-2 underline underline-offset-8 xs:text-xs">
          Promptly report lost items for immediate action by authorities.
        </p>
        <br />
        <div className="w-full  px-4 mb-8 flex justify-evenly flex-wrap lg:px-10 lg:ml-5 xs:ml-[0.4rem] xs:px-4">
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
