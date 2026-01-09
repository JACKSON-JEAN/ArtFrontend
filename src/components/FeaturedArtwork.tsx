import React, { useEffect } from "react";
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
  const { loading, error, data, refetch } = useQuery(GET_ARTWORK, {
    variables: {
      searchInput: {
        keyword: query,
      },
    },
  });

  useEffect(() => {
    const handleOnline = () => refetch();
    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, [refetch]);

  const isOffline = !navigator.onLine;

  const artwork = data?.getArtwork;

  return (
    <div className=" mb-4">
      <div className=" flex justify-between items-center">
        <h2 className=" text-xl text-red-950 font-semibold pb-3">
          Featured Artwork
        </h2>
        <Link
          className=" text-blue-600 text-sm flex items-center gap-1"
          to="collection"
        >
          <p>See All</p>
          <MoreIcon />
        </Link>
      </div>
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
        <p className="text-center text-slate-400">Loading artworks</p>
      )}
      <div className=" columns-2 sm:columns-3 md:columns-4 [column-fill:balance]">
        {artwork
          ?.filter((item: Artwork) => item.isFeatured === true)
          .map((item: Artwork) => (
            <ProductItem
              id={item.id}
              key={item.id}
              media={item.media || img1}
              title={item.title}
              description={item.description}
              category={item.category}
              imageHash={item.imageHash}
              material={item.material}
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
