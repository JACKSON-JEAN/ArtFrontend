import React from "react";
import { Link } from "react-router-dom";
import img3 from "../images/img3.jpeg";
import { Artwork } from "../types/artwork";
import ProductItem from "../components/ProductItem";
import { useSearch } from "../context/search.context";
import { useQuery } from "@apollo/client";
import { GET_ARTWORK, GET_NEW_ARRIVALS } from "../graphql/artwork";
import {IoIosArrowForward} from "react-icons/io"

const NewArrivals = () => {
  const MoreIcon = IoIosArrowForward as React.ComponentType<
      React.SVGProps<SVGSVGElement>
    >;

  const { query } = useSearch();
  const { loading, error, data } = useQuery(GET_NEW_ARRIVALS);
  const artwork = data?.getNewArrivals;

  if (loading) return <p>Loading</p>;
  if (error)
    return <p>There was an error when fetching data. {error.message}</p>;
  return (
    <div className=" mb-2">
      <div className=" flex justify-between items-center">
        <p className=" text-xl text-red-950 font-semibold mb-1">New Arrivals</p>
        <Link className=" text-blue-600 text-sm flex justify-between items-center gap-1" to="collection">
          <p>See All</p>
          <MoreIcon/>
        </Link>
      </div>
      <div className=" w-full pb-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {artwork
          .map((item: Artwork) => (
            <ProductItem
              id={item.id}
              key={item.id}
              media={item.media || img3}
              title={item.title}
              widthCm={item.widthCm}
              heightCm={item.heightCm}
              isFeatured={item.isFeatured}
              artworkId={item.id}
              price={item.price}
            />
          ))}
          
      </div>
    </div>
  );
};

export default NewArrivals;
