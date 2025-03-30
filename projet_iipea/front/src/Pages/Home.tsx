import React from "react";
import HeaderHome from "../Components/AppHeader_Home/HeaderHome";
import SectionHome from "../Components/AppHeader_Home/SectionHome";


const Home = () => {
  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <HeaderHome />
     
      <div className="flex flex-col items-center mt-40 w-full">
        <SectionHome />
       
      </div>
    </div>
  );
};

export default Home;
