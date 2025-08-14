import React from "react";
import image3 from "../images/jack.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextArrow, PrevArrow } from "../components/CustomArrows";
import Products from "../components/Products";

const artists = [
  {
    src: image3,
    name: "Mujuni Alex",
    speciality: "Painter",
    nationality: "Ugandan"
  },
  {
    src: image3,
    name: "Mujuni Alex",
    speciality: "Painter",
    nationality: "Ugandan"
  },
  {
    src: image3,
    name: "Mujuni Alex",
    speciality: "Painter",
    nationality: "Ugandan"
  },
  {
    src: image3,
    name: "Mujuni Alex",
    speciality: "Painter",
    nationality: "Ugandan"
  },
  {
    src: image3,
    name: "Mujuni Alex",
    speciality: "Painter",
    nationality: "Ugandan"
  },
  {
    src: image3,
    name: "Mujuni Alex",
    speciality: "Painter",
    nationality: "Ugandan"
  },
  {
    src: image3,
    name: "Mujuni Alex",
    speciality: "Painter",
    nationality: "Ugandan"
  },
  {
    src: image3,
    name: "Mujuni Alex",
    speciality: "Painter",
    nationality: "Ugandan"
  },
  {
    src: image3,
    name: "Mujuni Alex",
    speciality: "Painter",
    nationality: "Ugandan"
  },
  {
    src: image3,
    name: "Mujuni Alex",
    speciality: "Painter",
    nationality: "Ugandan"
  },
  {
    src: image3,
    name: "Mujuni Alex",
    speciality: "Painter",
    nationality: "Ugandan"
  },
  {
    src: image3,
    name: "Mujuni Alex",
    speciality: "Painter",
    nationality: "Ugandan"
  },
  {
    src: image3,
    name: "Mujuni Alex",
    speciality: "Painter",
    nationality: "Ugandan"
  },
  {
    src: image3,
    name: "Mujuni Alex",
    speciality: "Painter",
    nationality: "Ugandan"
  },
  {
    src: image3,
    name: "Mujuni Alex",
    speciality: "Painter",
    nationality: "Ugandan"
  },
  {
    src: image3,
    name: "Mujuni Alex",
    speciality: "Painter",
    nationality: "Ugandan"
  },
  {
    src: image3,
    name: "Mujuni Alex",
    speciality: "Painter",
    nationality: "Ugandan"
  },
]
const Artists = () => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: false,
    speed: 1000,
    autoplaySpeed: 3000,
    slidesToShow: 5, // default for largest screens
    slidesToScroll: 1,
    arrows: true,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1280, // xl screens and below
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // lg screens and below
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640, // sm screens and below
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  
  return (
    <div
      className={`${"wrapper"} w-full px-10 sm:px-16 min-h-screen pt-2 pb-10 bg-slate-50`}
    >
      <p className=" text-xl text-red-950 font-semibold pb-1 text-center">
        Creators of Original Masterpieces
      </p>
      <p className=" text-base text-gray-700 max-w-[600px] mx-auto text-center mb-8">
        From intricate sculptures to breathtaking photography, our artists bring
        diverse visions to life. Browse by artist, explore their creations, and
        find the perfect piece for your space.
      </p>

      <div className=" mb-8">
          <Slider {...settings}>
            {artists.map(({ src, name, speciality, nationality }, index) => (
              <div key={index} className=" relative px-2">
              <img src={src} alt="Jackson" loading="lazy" className=" border rounded-md" />
              <div className=" absolute bottom-0 left-0  w-full p-2">
                <div className=" bg-white border shadow-sm rounded-md px-1 py-0.5 -space-y-1">
                  <p className=" text-red-950">{name}</p>
                  <p className=" font-light">{nationality} - {speciality}</p>
                </div>
              </div>
            </div>
            ))}
          </Slider>
        </div>
        
      <Products subTitle="Some of their artwork" limit={8}/>
      
    </div>
  );
};

export default Artists;
