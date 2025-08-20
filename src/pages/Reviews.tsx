import React from "react";
import Rating from "../components/Rating";
import { useQuery } from "@apollo/client";
import { GET_REVIEWS } from "../graphql/reviews";

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
    <div
      className={`${"wrapper"} w-full px-10 sm:px-16 min-h-screen pt-4 pb-10 bg-slate-50`}
    >
      <p className=" text-2xl text-red-950 font-semibold pb-3">
        Our Clients' Reviews.
      </p>
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      <div className=" columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-2 sm:gap-4">
        {reviews.map((item: ReviewsItem) => (
          <div key={item.id} className=" w-full mb-2 sm:mb-4 bg-white p-2 border rounded-sm break-inside-avoid">
            <Rating count={4} rating={item.rating} />
            <p className=" italic text-gray-600 mb-2">
              &quot;{item.comment}&quot;
            </p>
            <p className=" font-semibold capitalize">{item.clientName}</p>
          </div>
        ))}
        {/* <div className=" w-full mb-2 sm:mb-4 bg-white p-2 border rounded-sm break-inside-avoid">
          <Rating count={4} rating={4.5} />
          <p className=" italic text-gray-600 mb-2">
            &quot;Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Consectetur dolorum facilis eius nesciunt amet quisquam nulla
            sapiente deleniti corporis! Iste.&quot;
          </p>
          <p className=" font-semibold">Jane Doe</p>
        </div> */}
      </div>
    </div>
  );
};

export default Reviews;
