import React from "react";
import { useNavigate } from "react-router-dom";
import Btn from "../Button/Btn";
import AfterLogin from "./AfterLogin/AfterLogin";

const UserStatus = () => {
  const email = localStorage.getItem("email");
  const isLogin = localStorage.getItem("isLogin") === "true";
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/sign-in");
  };

  return (
    <div className="mt-6 absolute ml-32 lg:ml-14  xs:ml-1 xs:mt-8 lg:hidden xs:block">
      {!isLogin ? (
        <Btn text="Login" onClick={handleLoginClick} />
      ) : (
        <AfterLogin className=" xs:ml-0" />
      )}
    </div>
  );
};

export default UserStatus;
