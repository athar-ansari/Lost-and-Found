import SignUpPage from "@/Components/(auth)/SignUp/SignUpPage";

import React from "react";

const SignUp = () => {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-[#F0EFF1] xs:p-3">
        <div className="w-full max-w-md    bg-[#FFFFFF] shadow-2xl rounded-2xl    p-4 ">
          <h1 className="flex justify-center items-center   text-3xl font-extrabold font-poppins xs:text-2xl">
            Create your account{" "}
          </h1>
          <p className="flex justify-center items-center  text-sm font-semibold opacity-95 xs:text-xs">
            Welcome! Please fill in the details to get started.
          </p>
          <SignUpPage />
          <hr className="border-1 border-black   mx-2 mt-6 " />
          <h1 className="  opacity-85 flex justify-center items-center  mt-2 font-lora">
            Already have an account?{" "}
            <a href="/sign-in" className="font-semibold ml-2  ">
              SignIn
            </a>
          </h1>
        </div>
      </div>
    </>
  );
};

export default SignUp;
