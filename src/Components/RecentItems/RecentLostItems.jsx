import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import {
  FaFacebook,
  FaWhatsapp,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function RecentLostItems() {
  const [lostItems, setLostItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  useEffect(() => {
    const fetchLostItems = async () => {
      try {
        const api = import.meta.env.VITE_API_URL;
        const response = await fetch(`${api}/item/lost_items`);
        if (!response.ok) throw new Error("Error fetching lost items");
        const data = await response.json();

        // Sort items by date and then by ID
        const sortedItems = data.sort((a, b) => {
          const dateComparison = new Date(b.date) - new Date(a.date);
          if (dateComparison !== 0) {
            return dateComparison;
          }
          return b.id.localeCompare(a.id); // Sort by ID if dates are the same
        });

        // Get the first four items
        const recentItems = sortedItems.slice(0, 4);

        const itemsWithUserNames = await Promise.all(
          recentItems.map(async (item) => {
            const userResponse = await fetch(`${api}/user/${item.email}`);
            if (!userResponse.ok) throw new Error("Error fetching user data");
            const userData = await userResponse.json();

            // Format the userName
            const formattedUserName =
              userData.name.charAt(0).toUpperCase() +
              userData.name.slice(1).toLowerCase();

            return { ...item, userName: formattedUserName };
          })
        );

        setLostItems(itemsWithUserNames);
      } catch (error) {
        console.error("Error fetching lost items:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLostItems();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div
      ref={ref}
      className="w-full px-4 gap-8 mb-8 flex justify-center flex-wrap lg:gap-8 lg:px-2"
    >
      {lostItems.map((item) => (
        <motion.div
          key={item.id}
          initial="hidden"
          animate={controls}
          variants={cardVariants}
        >
          <Card
            sx={{
              width: 320,
              maxWidth: "100%",
              boxShadow: "xl",
              marginTop: "30px",
              fontFamily: "lora",
              backgroundColor: "#F0EFF1",
            }}
          >
            <CardContent sx={{ alignItems: "center", textAlign: "center" }}>
              <Typography
                level="title-lg"
                sx={{
                  fontWeight: "700",
                }}
                className="underline underline-offset-2 "
              >
                {item.title}
              </Typography>
              <p className="text-sm opacity-90 -mb-1">{item.date}</p>
              <h3 className="opacity-80 -mb-3 italic underline underline-offset-2">
                Description
              </h3>
              <Typography
                level="body-sm"
                sx={{
                  maxWidth: "34ch",
                  margin: "0.5rem 0",
                  fontWeight: "700",
                  height: "210px",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                }}
              >
                {item.description}
              </Typography>

              <div className="font-bold ">
                <div>
                  <h3>Posted By</h3>
                </div>
                <hr className="border-1 border-black" />
                <div>
                  <p>
                    {item.userName}
                    <span className="ml-1">! </span>
                    <span className="text-sm font-medium">
                      ({item.department} - {item.semester})
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex -mt-2 gap-2">
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
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
