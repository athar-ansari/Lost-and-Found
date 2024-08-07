import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MoreNavBar from "@/Components/MoreNavBar/MoreNavBar";
import Footer from "../../Pages/Footer";
import IconButton from "@mui/joy/IconButton";
import {
  FaFacebook,
  FaWhatsapp,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import Loading from "../Loading/Loading";

// Utility function to capitalize the first letter and make other letters lowercase
const capitalizeName = (name) => {
  if (!name) return "";
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};

const MoreDetailsFound = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api = import.meta.env.VITE_API_URL;
        const response = await fetch(`${api}/item/found_items/${id}`);
        if (!response.ok) throw new Error("Error fetching item data");
        const data = await response.json();

        const userResponse = await fetch(`${api}/user/${data.email}`);
        if (!userResponse.ok) throw new Error("Error fetching user data");
        const userData = await userResponse.json();

        setItem({ ...data, userName: capitalizeName(userData.name) });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="bg-[#F0EFF1] overflow-hidden">
      <MoreNavBar />
      <div className="flex lg:flex-col flex-row  mt-10 xs:mt-4">
        <div className="flex justify-center items-center ml-5 lg:ml-0 w-1/2 lg:w-full p-3 lg:p-4  xs:p-6">
          <img
            src={item.image_url}
            alt={item.title}
            className="object-cover rounded-sm shadow-2xl"
            style={{ maxHeight: "400px" }}
          />
        </div>
        <div className="flex flex-col items-start ml-8   w-1/2  lg:w-full lg:ml-32 md:ml-10 sm:-mt-4 xs:ml-8">
          <div className=" ">
            {" "}
            <h2 className="font-bold text-2xl mt-16 lg:mt-8 xs:mt-1">
              {item.title}
            </h2>
            <p className="-mt-1 opacity-95  ">{item.date}</p>
            <h2 className="font-bold text-xl opacity-75 italic mt-1">
              {" "}
              Description
            </h2>
            <p className="mt-2 text-medium font-lora w-3/4 lg:w-[70%] md:w-[78%] xs:w-[85%] xs:text-base">
              {item.description}
            </p>
          </div>
          <br />
          <div className="flex -mt-3 lg:-mt-1">
            <div>
              <h3 className="mr-1 font-semibold">Posted By :</h3>
            </div>

            <div>
              <p className=" font-medium font-lora">
                {item.userName}
                <span className="ml-1"></span>({item.department} -{" "}
                {item.semester})
              </p>
            </div>
          </div>

          <div className="flex mt-1 gap-2">
            {item.instagram && (
              <IconButton
                component="a"
                href={item.instagram}
                target="_blank"
                rel="noopener noreferrer"
                color="neutral"
              >
                <FaInstagram />
              </IconButton>
            )}
            {item.facebook && (
              <IconButton
                component="a"
                href={item.facebook}
                target="_blank"
                rel="noopener noreferrer"
                color="neutral"
              >
                <FaFacebook />
              </IconButton>
            )}
            {item.linkedin && (
              <IconButton
                component="a"
                href={item.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                color="neutral"
              >
                <FaLinkedinIn />
              </IconButton>
            )}
            {item.whatsapp && (
              <IconButton
                component="a"
                href={item.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                color="neutral"
              >
                <FaWhatsapp />
              </IconButton>
            )}
          </div>
        </div>
      </div>
      <div className="mt-16 lg:mt-5 xs:mt-0">
        {" "}
        <Footer />
      </div>
    </div>
  );
};

export default MoreDetailsFound;
