import React from "react";
import img4 from "../images/img4.jpeg";
import img3 from "../images/img3.jpeg";
import img2 from "../images/img2.jpeg";
import img1 from "../images/img1.jpeg";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

const Categories = () => {
  const MoreIcon = IoIosArrowForward as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;

  return (
    <div className=" mb-6">
      <div className=" flex justify-between items-center">
        <p className=" text-xl text-red-950 font-semibold mb-1">Our Categories</p>
        <Link
          className=" text-blue-600 text-sm flex items-center gap-1"
          to="collection"
        >
          <p>See All</p>
          <MoreIcon />
        </Link>
      </div>
      <div className=" bg-white border shadow-sm grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 rounded-sm gap-3 px-3 py-3">
        <div className=" bg-white">
          <section>
            <img
              src={img1}
              alt="category"
              className=" rounded-sm h-40 w-full object-cover"
            />
          </section>
          <p className=" text-base">Paintings</p>
        </div>
        <div className=" bg-white">
          <section className="">
            <img
              src={img2}
              alt="Sculptures"
              className=" rounded-sm h-40 w-full object-cover"
            />
          </section>
          <p className=" text-base">Sculptures</p>
        </div>
        <div className=" bg-white">
          <section>
            <img
              src={img3}
              alt="Textiles"
              className=" rounded-sm h-40 w-full object-cover"
            />
          </section>
          <p className=" text-base">Textiles</p>
        </div>
        <div className=" bg-white">
          <section>
            <img
              src={img4}
              alt="Jewelry"
              className=" rounded-sm h-40 w-full object-cover"
            />
          </section>
          <p className=" text-base">Jewelry</p>
        </div>
      </div>
    </div>
  );
};

export default Categories;
