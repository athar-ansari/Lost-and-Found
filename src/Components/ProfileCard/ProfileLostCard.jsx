import React from "react";
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
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ProfileLostCard = ({ items }) => {
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
    <div ref={ref} className="flex flex-wrap gap-8 lg:gap-8">
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
                className="underline underline-offset-2"
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

              <div className="font-bold">
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
};

export default ProfileLostCard;
