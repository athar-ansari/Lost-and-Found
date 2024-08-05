import SignInPage from '@/Components/(auth)/SignIn/SignInPage'
import React from 'react'

const SignIn = () => {
  return (
     <>
      <div className="flex items-center justify-center min-h-screen bg-[#F0EFF1] xs:p-3">
        <div className="w-full max-w-md    bg-[#FFFFFF] shadow-2xl rounded-2xl    p-4 ">
          <h1 className="flex justify-center items-center font-lora  text-3xl font-extrabold   xs:text-2xl">
            Sign in to Loss & Found{" "}
          </h1>
          <p className="flex justify-center items-center  text-sm font-semibold opacity-95 xs:text-xs">
            Welcome back! Please sign in to continue.
          </p>
          <SignInPage />
          <hr className="border-1 border-black   mx-2 mt-6 " />
          <h1 className="  opacity-85 flex justify-center items-center  mt-2 font-lora">
            Don't have an account?{" "}
            <a href="/sign-up" className="font-semibold ml-2  ">
              SignUp
            </a>
          </h1>
        </div>
      </div>
     
     </>
  )
}

export default SignIn