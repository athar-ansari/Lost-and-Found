import React, { useState, useEffect } from "react";
import MoreNavBar from "@/Components/MoreNavBar/MoreNavBar";
import ProfileFoundCard from "@/Components/ProfileCard/ProfileFoundCard";
import ProfileLostCard from "@/Components/ProfileCard/ProfileLostCard";
import Footer from "./Footer";
import Loading from "../Components/Loading/Loading";

const Profile = () => {
  const [userName, setUserName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [userFoundItems, setUserFoundItems] = useState([]);
  const [userLostItems, setUserLostItems] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const email = localStorage.getItem("email");

  const formatUserName = (name) => {
    if (!name) return "";
    return name.toLowerCase();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (email) {
          const api = import.meta.env.VITE_API_URL;

          // Fetch user data
          const userResponse = await fetch(`${api}/user/${email}`);
          if (!userResponse.ok) throw new Error("Error fetching user data");
          const userData = await userResponse.json();
          if (userData) {
            if (userData.name) {
              setUserName(formatUserName(userData.name));
            }
            if (userData.profileImage) {
              setProfileImage(userData.profileImage);
            }
          }

          // Fetch found items
          const foundItemsResponse = await fetch(`${api}/item/found_items`);
          if (!foundItemsResponse.ok)
            throw new Error("Error fetching found items");
          const foundItemsData = await foundItemsResponse.json();
          const filteredFoundItems = foundItemsData.filter(
            (item) => item.email === email
          );
          setUserFoundItems(filteredFoundItems);

          // Fetch lost items with user names
          const lostItemsResponse = await fetch(`${api}/item/lost_items`);
          if (!lostItemsResponse.ok)
            throw new Error("Error fetching lost items");
          const lostItemsData = await lostItemsResponse.json();

          const itemsWithUserNames = await Promise.all(
            lostItemsData.map(async (item) => {
              const userResponse = await fetch(`${api}/user/${item.email}`);
              if (!userResponse.ok) throw new Error("Error fetching user data");
              const userData = await userResponse.json();
              const formattedUserName =
                userData.name.charAt(0).toUpperCase() +
                userData.name.slice(1).toLowerCase();
              return { ...item, userName: formattedUserName };
            })
          );

          const filteredLostItems = itemsWithUserNames.filter(
            (item) => item.email === email
          );
          setUserLostItems(filteredLostItems);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Data fetching is complete
      }
    };

    // Set a timer to simulate initial loading
    const timer = setTimeout(() => {
      fetchData();
    }, 1000); // 1 second delay

    return () => clearTimeout(timer);
  }, [email]);

  const handleImageError = (event) => {
    console.error("Error loading profile image:", event.target.src);
    event.target.src = "/defaultimage.png";
  };

  if (loading) {
    return <Loading />; // Show loading component while fetching data
  }

  return (
    <>
      <MoreNavBar />
      <h1 className="flex justify-center items-center mt-3 font-lora font-bold text-6xl xs:text-4xl">
        Your Profile
      </h1>
      <div className="flex justify-center items-center mt-3">
        <img
          src={profileImage || "/defaultimage.png"}
          alt="user profile"
          className="w-24 h-24 rounded-full mr-2 bg-transparent shadow-xl"
          onError={handleImageError}
        />
      </div>
      <h3 className="flex justify-center items-center mt-1 mr-3 font-bold">
        @{userName}
      </h3>
      <div className="font-lora font-bold text-5xl xs:text-2xl">
        <div className="found-post flex justify-center items-center mt-10">
          <h2 className="flex justify-center items-center mt-1">
            Your Found Items Post
          </h2>
        </div>
        <div className="flex justify-evenly mb-8 p-8 lg:ml-11 lg:p-5 xs:p-2 xs:ml-2">
          {userFoundItems.length > 0 ? (
            <ProfileFoundCard items={userFoundItems} />
          ) : (
            <p className="flex justify-center items-center mt-5 font-lora font-bold text-4xl xs:text-2xl">
              No posts available
            </p>
          )}
        </div>
        <hr className="border-1 border-black mx-10 mt-8 lg:mx-6  xs:mx-4  xs:mt-5" />
        <div className="lost-post flex justify-center items-center mt-10">
          <h2 className="flex justify-center items-center mt-1">
            Your Lost Items Post
          </h2>
        </div>
        <div className="flex justify-evenly mb-8 p-8 lg:ml-11 lg:p-5 xs:p-2 xs:ml-2">
          {userLostItems.length > 0 ? (
            <ProfileLostCard items={userLostItems} />
          ) : (
            <p className="flex justify-center items-center mt-5 font-lora font-bold text-4xl xs:text-2xl">
              No posts available
            </p>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;
