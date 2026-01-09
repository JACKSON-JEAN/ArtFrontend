import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import img1 from "../images/art1.jpg";
import { GET_ARTWORK } from "../graphql/artwork";
import { useQuery } from "@apollo/client";
import { Artwork } from "../types/artwork";
import { Link, useLocation } from "react-router-dom";
import { useSearch } from "../context/search.context";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";

type ProductsProps = {
  limit?: number;
  subTitle?: string;
  categoryFilter?: string;
  onFilter?: (category: string) => void;
  selectedArtworkId?: number
};

const Products: React.FC<ProductsProps> = ({ limit, subTitle, selectedArtworkId }) => {
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [displayFilter, setDisplayFilter] = useState<boolean>(false);

  const handleSelectCategory = (category: string) => {
    setCategoryFilter(category);
    setDisplayFilter(false);
  };

  const MoreIcon = IoIosArrowForward as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;

  const SelectIcon = IoIosArrowDown as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;
  const location = useLocation();
  const { query } = useSearch();
  const { loading, error, data, refetch } = useQuery(GET_ARTWORK, {
    variables: {
      searchInput: {
        keyword: query,
      },
    },
  });
  const isOffline = !navigator.onLine;

  const artwork = data?.getArtwork || [];
  const displayedArtwork = limit ? artwork.slice(0, limit) : artwork;

  const filteredCategory = displayedArtwork.filter((item: Artwork) =>
    categoryFilter === ""
      ? true
      : item.category?.toUpperCase() === categoryFilter.toUpperCase()
  );

  const isCollectionPage = location.pathname === "/collection";

  useEffect(() => {
    const handleOnline = () => refetch();
    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, [refetch]);

  return (
    <div className=" w-full mb-10">
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
        <p className="text-center text-slate-400">Loading artworks…</p>
      )}
      {!error && !loading && displayedArtwork.length > 0 && (
        <div className=" flex justify-between items-center mb-2">
          <p className=" text-xl text-red-950 font-semibold mb-1">{subTitle}</p>
          {!isCollectionPage && (
            <Link
              className=" text-blue-600 text-sm flex items-center gap-1"
              to="/collection"
            >
              <p>See All</p>
              <MoreIcon />
            </Link>
          )}
          {isCollectionPage && (
            <div className=" shadow-sm border w-24 relative">
              <p
                onClick={() => setDisplayFilter(!displayFilter)}
                className=" px-1 py-0.5 capitalize cursor-pointer"
              >
                {categoryFilter === "" ? "All" : categoryFilter.toLowerCase()}
              </p>
              <p className=" absolute right-1 top-[9px]">
                <SelectIcon />
              </p>
              {displayFilter && (
                <div className=" absolute left-0 bg-white shadow-sm border w-full">
                  <p
                    onClick={() => handleSelectCategory("")}
                    className=" px-1 py-0.5 cursor-pointer hover:bg-blue-600 hover:text-white"
                  >
                    All
                  </p>
                  <p
                    onClick={() => handleSelectCategory("PAINTING")}
                    className=" px-1 py-0.5 cursor-pointer hover:bg-blue-600 hover:text-white"
                  >
                    Painting
                  </p>
                  <p
                    onClick={() => handleSelectCategory("SCULPTURE")}
                    className=" px-1 py-0.5 cursor-pointer hover:bg-blue-600 hover:text-white"
                  >
                    Sculpture
                  </p>
                  <p
                    onClick={() => handleSelectCategory("TEXTILE")}
                    className=" px-1 py-0.5 cursor-pointer hover:bg-blue-600 hover:text-white"
                  >
                    Textile
                  </p>
                  <p
                    onClick={() => handleSelectCategory("JEWELRY")}
                    className=" px-1 py-0.5 cursor-pointer hover:bg-blue-600 hover:text-white"
                  >
                    Jewelry
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {filteredCategory.length < 1 && (
        <p className="text-lg font-semibold text-center">No artwork found!</p>
      )}

      <div className=" columns-2 sm:columns-3 md:columns-4 [column-fill:balance]">
        {filteredCategory?.filter((item: Artwork) => item.id !== selectedArtworkId).map((item: Artwork) => (
          <ProductItem
            id={item.id}
            key={item.id}
            media={item.media || img1}
            title={item.title}
            description={item.description}
            imageHash={item.imageHash}
            category={item.category}
            material={item.material}
            widthCm={item.widthCm}
            heightCm={item.heightCm}
            isFeatured={item.isFeatured}
            isAvailable={item.isAvailable}
            artworkId={item.id}
            price={item.price}
            showButton={true}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
