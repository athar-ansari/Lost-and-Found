import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Btn from "../../Button/Btn";
import Card from "@mui/joy/Card";
import AspectRatio from "@mui/joy/AspectRatio";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Loading from "@/Components/Loading/Loading";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const FoundItemsCard = () => {
  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(true); // State for tracking loading
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api = import.meta.env.VITE_API_URL;
        const response = await fetch(`${api}/item/found_items`);
        if (!response.ok) throw new Error("Error fetching data");
        const data = await response.json();
        setFoundItems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Data fetching is complete
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const cardVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  if (loading) {
    return <Loading />; // Show loading component while fetching data
  }

  return (
    <div
      ref={ref}
      className="w-full px-4 gap-8 mb-8 flex justify-center flex-wrap   lg:px-2"
    >
      {foundItems.map((item) => (
        <motion.div
          key={item.id}
          initial="hidden"
          animate={controls}
          variants={cardVariants}
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
              <Typography
                component="span"
                className="font-lora font-bold overflow-ellipsis"
              >
                {item.title}
              </Typography>
              <div className="mt-2 flex justify-center items-center">
                <Link to={`/detailsfound/${item.id}`}>
                  <Btn text="Show details" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default FoundItemsCard;
