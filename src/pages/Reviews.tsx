import React from "react";
import Rating from "../components/Rating";
import { useQuery } from "@apollo/client";
import { GET_REVIEWS } from "../graphql/reviews";
import { Helmet } from "@dr.pogodin/react-helmet";

export interface ReviewsItem {
  id: number;
  rating: number;
  comment: string;
  clientName: string;
}

const Reviews = () => {
  const { loading, error, data } = useQuery(GET_REVIEWS);
  const reviews = data?.getReviews || [];

  return (
    <>
      <Helmet>
        <title>Customer Reviews | Pearl Art Galleries</title>
        <meta
          name="description"
          content="Read what our customers say about their experience with Pearl Art Galleries. Discover why collectors around the world trust us for original African art."
        />
        <link
          rel="canonical"
          href="https://pearlartgalleries.com/reviews"
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Customer Reviews | Pearl Art Galleries"
        />
        <meta
          property="og:description"
          content="See why collectors trust Pearl Art Galleries for original African art."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dsawd9eso/image/upload/v1760267152/kampala_1_jltha2.jpg"
        />
        <meta
          property="og:url"
          content="https://pearlartgalleries.com/reviews"
        />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Customer Reviews | Pearl Art Galleries"
        />
        <meta
          name="twitter:description"
          content="Read customer reviews of Pearl Art Galleries for original African art."
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/dsawd9eso/image/upload/v1760267152/kampala_1_jltha2.jpg"
        />
      </Helmet>

      <div
        className={`${"wrapper"} w-full px-10 sm:px-16 min-h-screen pt-4 pb-10 bg-slate-100`}
      >
        <h1 className=" text-center text-xl text-red-950 font-semibold pb-3">
          Our Clients' Reviews.
        </h1>
        {loading && <p>Loading...</p>}
        {error && <p>{error.message}</p>}
        <div className=" columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-2 sm:gap-4">
          {reviews.map((item: ReviewsItem) => (
            <div
              key={item.id}
              className=" w-full mb-2 sm:mb-4 bg-white p-2 border rounded-sm break-inside-avoid"
            >
              <Rating count={4} rating={item.rating} />
              <p className=" italic text-gray-600 mb-2">
                &quot;{item.comment}&quot;
              </p>
              <p className=" font-semibold capitalize">{item.clientName}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Reviews;
