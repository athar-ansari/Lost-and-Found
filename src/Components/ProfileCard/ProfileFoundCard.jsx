import React from "react";
import { Link } from "react-router-dom";
import Btn from "../Button/Btn";
import Card from "@mui/joy/Card";
import AspectRatio from "@mui/joy/AspectRatio";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ProfileFoundCard = ({ items }) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const cardVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div ref={ref} className="flex flex-wrap gap-8 lg:gap-5 xs:ml-1">
      {items.map((item) => (
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

export default ProfileFoundCard;
