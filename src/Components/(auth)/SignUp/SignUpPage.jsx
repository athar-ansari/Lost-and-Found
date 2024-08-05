import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Button } from "@/Components/ui/button";
import { FaRegEnvelope, FaEye, FaEyeSlash, FaRegUser } from "react-icons/fa";
import { useToast } from "../../ui/use-toast";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const maxLength = 8;

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validateEmail(email)) {
      setErrorMessage("Invalid email format");
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
      });
      return;
    }

    try {
      const api = import.meta.env.VITE_API_URL;

      const response = await fetch(`${api}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Registration Successful",
        });
        setTimeout(() => {
          navigate("/sign-in");
        }, 2000);
      } else {
        setErrorMessage(result.detail);
        toast({
          title: "Submission Failed",
          description: result.detail,
        });
      }
    } catch (error) {
      setErrorMessage("An error occurred while submitting the form.");
      toast({
        title: "Submission Error",
        description: "An error occurred while submitting the form.",
      });
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="space-y-3 mt-10 font-medium w-[350px]"
      >
        {errorMessage && (
          <div className="text-red-500 text-center font-bold mb-4">
            {errorMessage}
          </div>
        )}
        <div className="grid w-full max-w-sm items-center gap-1">
          <div className="relative">
            <Input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter your name (displayed publicly)"
              maxLength={maxLength}
              required
              className="pl-3 uppercase"
            />
            <FaRegUser className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          {name.length > 0 && (
            <div className="text-sm text-gray-500 mt-1">
              {maxLength - name.length} Characters remaining
            </div>
          )}
        </div>
        <div className="grid w-full max-w-sm items-center gap-1">
          <Label htmlFor="email" className="mb-1">
            Email address
          </Label>
          <div className="relative">
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              required
              className="pl-3"
            />
            <FaRegEnvelope className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1">
          <Label htmlFor="password" className="mb-1">
            Password
          </Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              maxLength={10}
              required
              className="pl-3"
            />
            <FaEye
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer ${
                showPassword ? "hidden" : "block"
              }`}
              onClick={() => setShowPassword(true)}
            />
            <FaEyeSlash
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer ${
                showPassword ? "block" : "hidden"
              }`}
              onClick={() => setShowPassword(false)}
            />
          </div>
        </div>

        <Button type="submit" className="mt-2 tracking-wider">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default SignUpPage;
