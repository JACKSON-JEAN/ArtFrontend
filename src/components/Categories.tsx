import React from "react";
import paintings from "../images/painting.jpg"
import sculptures from "../images/sculpture.jpg";
import textiles from "../images/textile.jpg";
import jewelry from "../images/jewlery.jpg";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

const Categories = () => {
  const MoreIcon = IoIosArrowForward as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;

  return (
    <div className=" mb-10">
      <div className=" flex justify-between items-center">
        <p className=" text-2xl text-red-950 font-semibold pb-3">
          Our Categories
        </p>
        <Link
          className=" text-blue-600 text-sm flex items-center gap-1"
          to="collection"
        >
          <p>See All</p>
          <MoreIcon />
        </Link>
      </div>
      <div className=" flex">
        <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <div className=" flex-1 ">
            <div className=" h-48 w-full">
            <img
              loading="lazy"
              src={paintings}
              alt="Jewelry"
              className=" rounded-sm w-full h-full object-cover border"
            />
            </div>
            <p className=" text-xl">Paintings</p>
          </div>
          <div className=" flex-1 ">
            <div className=" h-48 w-full">
            <img
              loading="lazy"
              src={sculptures}
              alt="Jewelry"
              className=" rounded-sm w-full h-full object-cover border"
            />
            </div>
            <p className=" text-xl">Sculptures</p>
          </div>
          <div className=" flex-1">
            <div className=" h-48 w-full">
            <img
              loading="lazy"
              src={textiles}
              alt="Jewelry"
              className=" rounded-sm w-full h-full object-cover border"
            />
            </div>
            <p className=" text-xl">Textile</p>
          </div>
          
          <div className=" flex-1">
            <div className=" h-48 w-full">
            <img
              loading="lazy"
              src={jewelry}
              alt="Jewelry"
              className=" rounded-sm w-full h-full object-cover border"
            />
            </div>
            <p className=" text-xl">Jewelry</p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Categories;
