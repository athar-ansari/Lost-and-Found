import React, { useEffect, useState } from "react";
import MoreNavBar from "@/Components/MoreNavBar/MoreNavBar";
import Footer from "../../Pages/Footer";
import FoundItemsCard from "@/Components/Card/FoundItemsCard/FoundItemsCard";
import Loading from "../Loading/Loading";

const ShowAllFound = () => {
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (initialLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="bg-[#F0EFF1] ">
        <MoreNavBar />
        <div className="flex justify-evenly mb-8 p-8 lg:ml-11 lg:p-5 xs:p-2 xs:ml-2">
          <FoundItemsCard />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ShowAllFound;
