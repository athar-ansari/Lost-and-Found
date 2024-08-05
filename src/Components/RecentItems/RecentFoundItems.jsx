import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Btn from "../Button/Btn";
import Card from "@mui/joy/Card";
import AspectRatio from "@mui/joy/AspectRatio";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { useToast, ToastAction } from "@/Components/ui/use-toast"; // Adjust import path as needed
import { useNavigate } from "react-router-dom";

const RecentFoundItems = () => {
  const [foundItems, setFoundItems] = useState([]);
  const { toast, dismiss } = useToast();
  const [toastId, setToastId] = useState(null);
  const navigate = useNavigate();
  const isSignedIn = localStorage.getItem("isLogin") === "true";
  const api = import.meta.env.VITE_API_URL;
  
  useEffect(() => {
    fetch(`${api}/item/found_items`)
      .then((response) => response.json())
      .then((data) => {
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
        setFoundItems(recentItems);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

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
    <div className="flex flex-wrap gap-8 lg:gap-8">
      {foundItems.map((item, index) => (
        <AnimatedCard
          key={item.id}
          item={item}
          index={index}
          handleShowMoreClick={handleShowMoreClick}
        />
      ))}
    </div>
  );
};

const AnimatedCard = ({ item, index, handleShowMoreClick }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start({ x: 0, opacity: 1 });
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ x: -100, opacity: 0 }}
      animate={controls}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      <Card
        sx={{
          width: 320,
          backgroundColor: "transparent",
          borderColor: "black",
          marginTop: "30px",
        }}
      >
        <AspectRatio maxHeight="300px" className="shadow-lg">
          <img
            src={item.image_url}
            loading="lazy"
            alt={item.title}
            className="object-cover rounded-sm"
          />
        </AspectRatio>

        <CardContent className="flex flex-col items-center">
          <Typography component="span" className="font-lora font-bold">
            {item.title}
          </Typography>

          <div className="mt-2 flex justify-center items-center">
            <Link to={`/detailsfound/${item.id}`} onClick={handleShowMoreClick}>
              <Btn text="Show details" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RecentFoundItems;
