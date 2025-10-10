import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextArrow, PrevArrow } from "../components/CustomArrows";
import Products from "../components/Products";
import ImageComponent from "../components/ImageComponent";

const artists = [
  {
    src: "https://res.cloudinary.com/dsawd9eso/image/upload/v1760099113/artist2_4_uvifgw.jpg",
    imageHash: "LAG8x}?u1DM|0P-;nWtR0y-q~Co$",
    name: "Johnson Kambugu",
    speciality: "Painter",
    nationality: "Ugandan",
  },
  {
    src: "https://res.cloudinary.com/dsawd9eso/image/upload/v1760099186/artist2_3_obboqn.jpg",
    imageHash: "LOJHTmNI~jn%}aJ7M$xWRRnSN2RS",
    name: "Peter May",
    speciality: "Painter",
    nationality: "Ugandan",
  },
  {
    src: "https://res.cloudinary.com/dsawd9eso/image/upload/v1760099274/artist4_eb0ewn.jpg",
    imageHash: "LQGIK9RN?d-q-;xYMxR-cGs.S5bb",
    name: "Knite Frank",
    speciality: "Painter",
    nationality: "Ugandan",
  },
  {
    src: "https://res.cloudinary.com/dsawd9eso/image/upload/v1760101852/artist2_1_jtfqz6.jpg",
    imageHash: "LfHLPPjF_Nbc?bj?tRj]E1fkRPoL",
    name: "Augustus Kimbugwe",
    speciality: "Painter",
    nationality: "Ugandan",
  },
];
const Artists = () => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: false,
    speed: 1000,
    autoplaySpeed: 3000,
    slidesToShow: 4, // default for largest screens
    slidesToScroll: 1,
    arrows: true,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
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
        Creators of original masterpieces
      </p>
      <div className=" ">
        <p className=" text-base text-gray-700 max-w-[600px] mx-auto mb-8">
          From intricate sculptures to breathtaking photography, our artists
          bring diverse visions to life. Browse by artist, explore their
          creations, and find the perfect piece for your space.
        </p>
      </div>

      <div className=" mb-8">
        <Slider {...settings}>
          {artists.map(({ src, name, speciality, nationality, imageHash }, index) => (
            <div key={index} className=" relative px-2">
              <ImageComponent
                src={src}
                name={name}
                imageHash={imageHash}
              />
              <div className=" absolute bottom-0 left-0  w-full p-2">
                <div className=" px-2">
                  <div className=" bg-white border shadow-sm rounded-sm px-1 py-0.5 -space-y-1">
                    <p className=" text-red-950">{name}</p>
                    <p className=" font-light">
                      {nationality} - {speciality}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <Products subTitle="Some of their artwork" limit={8} />
    </div>
  );
};

export default Artists;
