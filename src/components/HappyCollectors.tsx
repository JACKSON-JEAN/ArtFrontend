import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextArrow, PrevArrow } from "./CustomArrows";

const Reviews = [
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam,illo maxime deleniti iusto facilis provident sit ipsum facere natus amet rerum quisquam commodi reprehenderit tenetur animi, dolores eaque labore. Adipisci.",
    name: "John Doe",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam,illo maxime deleniti iusto facilis provident sit ipsum facere natus amet rerum quisquam commodi reprehenderit tenetur animi, dolores eaque labore. Adipisci.",
    name: "Jane Doe",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam,illo maxime deleniti iusto facilis provident sit ipsum facere natus amet rerum quisquam commodi reprehenderit tenetur animi, dolores eaque labore. Adipisci.",
    name: "John Doe",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam,illo maxime deleniti iusto facilis provident sit ipsum facere natus amet rerum quisquam commodi reprehenderit tenetur animi, dolores eaque labore. Adipisci.",
    name: "Jane Doe",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam,illo maxime deleniti iusto facilis provident sit ipsum facere natus amet rerum quisquam commodi reprehenderit tenetur animi, dolores eaque labore. Adipisci.",
    name: "John Doe",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam,illo maxime deleniti iusto facilis provident sit ipsum facere natus amet rerum quisquam commodi reprehenderit tenetur animi, dolores eaque labore. Adipisci.",
    name: "Jane Doe",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam,illo maxime deleniti iusto facilis provident sit ipsum facere natus amet rerum quisquam commodi reprehenderit tenetur animi, dolores eaque labore. Adipisci.",
    name: "John Doe",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam,illo maxime deleniti iusto facilis provident sit ipsum facere natus amet rerum quisquam commodi reprehenderit tenetur animi, dolores eaque labore. Adipisci.",
    name: "Jane Doe",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam,illo maxime deleniti iusto facilis provident sit ipsum facere natus amet rerum quisquam commodi reprehenderit tenetur animi, dolores eaque labore. Adipisci.",
    name: "John Doe",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam,illo maxime deleniti iusto facilis provident sit ipsum facere natus amet rerum quisquam commodi reprehenderit tenetur animi, dolores eaque labore. Adipisci.",
    name: "Jane Doe",
  },
];

const HappyCollectors: React.FC = () => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: false,
    speed: 1000,
    autoplaySpeed: 3000,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768, // below md
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="mb-10 border-t border-b p-4 bg-slate-100 relative">
      <p className="text-2xl text-red-950 font-semibold text-center pb-6">
        Reviews from our happy collectors
      </p>

      <div className="flex justify-center">
        <div className="w-full sm:max-w-4xl">
          <Slider {...settings}>
            {Reviews.map(({ title, name }, index) => (
              <div key={index} className="p-4">
                <p className="italic text-gray-500">"{title}"</p>
                <p className="font-semibold">{name}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default HappyCollectors;
