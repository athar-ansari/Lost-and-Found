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
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (initialLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="bg-[#F0EFF1] overflow-hidden">
        <MoreNavBar />
        <div className="w-full px-4 mb-8 flex justify-center flex-wrap  lg:px-10">
          <FoundItemsCard />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ShowAllFound;
