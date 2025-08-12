import React from "react";
import img3 from "../images/img3.jpeg";
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
        {/* <div>
          <img
            src={img4}
            alt="Jewelry"
            className=" rounded-sm w-full object-cover"
          />
        </div> */}
        <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <div className=" flex-1">
            <img
              src={img3}
              alt="Jewelry"
              className=" rounded-sm w-full object-cover"
            />
            <p className=" text-xl">Paintings</p>
          </div>
          <div className=" flex-1">
            <img
              src={img3}
              alt="Jewelry"
              className=" rounded-sm w-full object-cover"
            />
            <p className=" text-xl">Sculptures</p>
          </div>
          <div className=" flex-1">
            <img
              src={img3}
              alt="Jewelry"
              className=" rounded-sm w-full object-cover"
            />
            <p className=" text-xl">Textile</p>
          </div>
          
          <div className=" flex-1">
            <img
              src={img3}
              alt="Jewelry"
              className=" rounded-sm w-full object-cover"
            />
            <p className=" text-xl">Jewelry</p>
          </div>
        </div>
        {/* <div className=" bg-white">
          <section>
            <img
              src={img1}
              alt="category"
              className=" rounded-sm w-full object-cover"
            />
          </section>
          <p className=" text-base">Paintings</p>
        </div>
        <div className=" bg-white">
          <section className="">
            <img
              src={img2}
              alt="Sculptures"
              className=" rounded-sm w-full object-cover"
            />
          </section>
          <p className=" text-base">Sculptures</p>
        </div>
        <div className=" bg-white">
          <section>
            <img
              src={img3}
              alt="Textiles"
              className=" rounded-sm w-full object-cover"
            />
          </section>
          <p className=" text-base">Textiles</p>
        </div>
        <div className=" bg-white">
          <section>
            <img
              src={img4}
              alt="Jewelry"
              className=" rounded-sm w-full object-cover"
            />
          </section>
          <p className=" text-base">Jewelry</p>
        </div> */}
      </div>
    </div>
  );
};

export default Categories;
