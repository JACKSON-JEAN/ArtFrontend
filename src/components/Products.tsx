import React, { useState } from "react";
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
};

const Products: React.FC<ProductsProps> = ({ limit, subTitle }) => {
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
  const { loading, error, data } = useQuery(GET_ARTWORK, {
    variables: {
      searchInput: {
        keyword: query,
      },
    },
  });
  const artwork = data?.getArtwork || [];
  const displayedArtwork = limit ? artwork.slice(0, limit) : artwork;

  const filteredCategory = displayedArtwork.filter((item: Artwork) => {
    if (categoryFilter === "") {
      return displayedArtwork;
    }

    return item.category?.toUpperCase() === categoryFilter?.toUpperCase();
  });

  const isCollectionPage = location.pathname === "/collection";

  if (loading) return <p>Loading</p>;
  if (error)
    return <p>There was an error when fetching data. {error.message}</p>;

  return (
    <div className=" w-full mb-10">
      {displayedArtwork.length > 0 && (
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
                <SelectIcon/>
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

      {displayedArtwork.length < 1 && (
        <p className=" text-lg font-semibold text-center">No artwork found!</p>
      )}
      <div className=" w-full pb-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCategory.map((item: Artwork) => (
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
            showButton={true}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
