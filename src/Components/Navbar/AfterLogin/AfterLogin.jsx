import React, { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../../ui/navigation-menu";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import ReportBtn from "../../ReportBtn/ReportBtn";

const AfterLogin = () => {
  const [userName, setUserName] = useState("");
  const email = localStorage.getItem("email");
  const navigate = useNavigate();
  const api = import.meta.env.VITE_API_URL;
  const formatUserName = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  useEffect(() => {
    if (email) {
      // Replace with your API endpoint to fetch user data by email
      fetch(`${api}/user/${email}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.name) {
            setUserName(formatUserName(data.name));
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [email]);

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("isLogin");
    navigate("/"); // Redirect to home page
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleLinkClick = (e) => {
    e.preventDefault();
    setIsDialogOpen(true);
  };

  return (
    <NavigationMenu className="lg:-ml-12  xs:-ml-5">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent font-lora font-bold text-base mt-1 xs:text-sm xs:p-1 ">
            Hi, {userName} !{" "}
            <FaRegUserCircle className="ml-1 mb-[0.08rem] xs:mb-[0.05rem] " />
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-transparent  p-2 px-3   rounded-lg  ">
            <NavigationMenuList className="px-5 xs:px-3 m-1 ">
              <Link to="/profile">Profile</Link>
            </NavigationMenuList>
            <hr className="border-black   " />
            <NavigationMenuList className="px-5 xs:px-3 m-1 hidden lg:block">
              <Link to="#" onClick={handleLinkClick}>
                Report
              </Link>
              <ReportBtn
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
              />
            </NavigationMenuList>
            <hr className="border-black   " />
            <NavigationMenuList className="px-5 xs:px-3  mt-1">
              <Link onClick={handleLogout}>Logout</Link>
            </NavigationMenuList>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default AfterLogin;
