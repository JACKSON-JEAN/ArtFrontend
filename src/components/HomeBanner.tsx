import React from "react";
import banner1 from "../images/banner1.png"

const HomeBanner = () => {
  return (
    <div className=" bg-white p-2 border shadow-sm rounded-sm mb-4">
      <img src={banner1} className=" w-full object-cover max-h-56 rounded-sm" alt="" />
    </div>
  );
};

export default HomeBanner;
