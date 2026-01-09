import React, { useEffect } from "react";
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

  const isOffline = !navigator.onLine;
  const { loading, error, data, refetch } = useQuery(GET_REVIEWS);
  const reviews = data?.getReviews || [];

  useEffect(() => {
    const handleOnline = () => refetch();
    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, [refetch]);

  return (
    <div className="mb-10 border-t border-b p-4 bg-slate-100 relative">
      <h2 className="text-xl text-red-950 font-semibold text-center mb-1">
        Reviews from our happy collectors
      </h2>
      {!isOffline && error && (
        <div className="text-center py-10 text-red-600">
          {error.networkError ? (
            <>
              <p className="font-medium">Network error</p>
              <p className="text-sm mt-1">
                Please check your internet connection.
              </p>

              <button
                onClick={() => !isOffline && refetch()}
                disabled={loading || isOffline}
                className="mt-3 text-blue-500 underline disabled:opacity-50"
              >
                Retry
              </button>
            </>
          ) : (
            <p className="text-sm">{error.message}</p>
          )}
        </div>
      )}

      {isOffline && (
        <p className="text-center text-gray-500">
          You’re offline. Please reconnect to the internet.
        </p>
      )}

      {loading && !error && (
        <p className="text-center text-slate-400">Loading reviews</p>
      )}

      {!loading && reviews.length === 0 && (
        <p className="text-center text-gray-500 py-10">
          No reviews available at the moment.
        </p>
      )}

      <div className="flex justify-center">
        <div className="w-full sm:max-w-4xl">
          {reviews.length > 0 && (
            <Slider {...settings}>
              {reviews.map((item: ReviewsItem) => (
                <div key={item.id} className="p-4">
                  <p className="italic text-gray-500">"{item.comment}"</p>
                  <p className="font-semibold">{item.clientName}</p>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </div>
  );
};

export default HappyCollectors;
