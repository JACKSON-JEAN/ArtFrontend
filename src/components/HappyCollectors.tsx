import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextArrow, PrevArrow } from "./CustomArrows";
import { useQuery } from "@apollo/client";
import { GET_REVIEWS } from "../graphql/reviews";
import { ReviewsItem } from "../pages/Reviews";

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

  const { loading, error, data } = useQuery(GET_REVIEWS);
    const reviews = data?.getReviews || [];

  return (
    <div className="mb-10 border-t border-b p-4 bg-slate-100 relative">
      <p className="text-2xl text-red-950 font-semibold text-center pb-6">
        Reviews from our happy collectors
      </p>
      {error && <p>{error?.message}</p>}
      {loading && <p>Loading...</p>}

      <div className="flex justify-center">
        <div className="w-full sm:max-w-4xl">
          <Slider {...settings}>
            {reviews.map((item: ReviewsItem) => (
              <div key={item.id} className="p-4">
                <p className="italic text-gray-500">"{item.comment}"</p>
                <p className="font-semibold">{item.clientName}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default HappyCollectors;
