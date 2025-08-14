import React from "react";
import { Link } from "react-router-dom";
import img1 from "../images/img1.jpeg";
import { Artwork } from "../types/artwork";
import ProductItem from "./ProductItem";
import { GET_ARTWORK } from "../graphql/artwork";
import { useQuery } from "@apollo/client";
import { useSearch } from "../context/search.context";
import { IoIosArrowForward } from "react-icons/io";

const FeaturedArtwork = () => {
  const MoreIcon = IoIosArrowForward as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;
  const { query } = useSearch();
  const { loading, error, data } = useQuery(GET_ARTWORK, {
    variables: {
      searchInput: {
        keyword: query,
      },
    },
  });
  const artwork = data?.getArtwork;

  if (loading) return <p>Loading</p>;
  if (error)
    return <p>There was an error when fetching data. {error.message}</p>;
  return (
    <div className=" mb-4">
      <div className=" flex justify-between items-center">
        <p className=" text-2xl text-red-950 font-semibold pb-3">Featured Artwork</p>
        <Link
          className=" text-blue-600 text-sm flex items-center gap-1"
          to="collection"
        >
          <p>See All</p>
          <MoreIcon />
        </Link>
      </div>
      <div className=" w-full pb-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {artwork
          .filter((item: Artwork) => item.isFeatured === true)
          .map((item: Artwork) => (
            <ProductItem
              id={item.id}
              key={item.id}
              media={item.media || img1}
              title={item.title}
              category={item.category}
              widthCm={item.widthCm}
              heightCm={item.heightCm}
              isFeatured={item.isFeatured}
              isAvailable={item.isAvailable}
              artworkId={item.id}
              price={item.price}
            />
          ))}
      </div>
    </div>
  );
};

export default FeaturedArtwork;
