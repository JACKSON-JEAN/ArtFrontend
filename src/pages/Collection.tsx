import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@apollo/client";
import { IoIosArrowDown, IoIosSearch } from "react-icons/io";
import { GET_ARTWORK } from "../graphql/artwork";
import { Artwork } from "../types/artwork";
import ArtItem from "../components/ArtItem";

const Collection = () => {
  const FilterIcon = IoIosArrowDown as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;
  const SearchIcon = IoIosSearch as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;

  const [openFilter, setOpenFilter] = useState(false);
  const [filter, setFilter] = useState<string>("All");
  const [search, setSearch] = useState<string>("");

  const filterRef = useRef<HTMLDivElement>(null)

  const { loading, error, data } = useQuery(GET_ARTWORK, {
    variables: {
      searchInput: {
        keyword: search,
      },
    },
  });

  const artwork = data?.getArtwork || [];
  // const displayedArtwork = limit ? artwork.slice(0, limit) : artwork;

  const filteredCategory = artwork.filter((item: Artwork) => {
    if (filter === "All") {
      return artwork;
    }

    return item.category?.toUpperCase() === filter?.toUpperCase();
  });

  const toggleFilter = () => {
    setOpenFilter(!openFilter);
  };

  const handleSelectFilter = (filter: string) => {
    setFilter(filter);
    console.log(filter.toUpperCase());
    setOpenFilter(false);
  };

  const searchHandler = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(search);
  };

  useEffect(() =>{
      const handleClickOutside = (event: MouseEvent) =>{
          if(
            filterRef.current &&
            !filterRef.current.contains(event.target as Node)
          ){
            setOpenFilter(false)
          }
      }
      document.addEventListener("mousedown", handleClickOutside)
      return () =>{
          document.removeEventListener("mousedown", handleClickOutside)
      }
    },[])

  return (
    <div
      className={`${"wrapper"} w-full px-10 sm:px-16 min-h-screen py-3 bg-slate-50`}
    >
      <div className=" w-full flex items-center gap-10">
        <div className={`${"paintings"} w-full flex justify-between`}>
          <p
            className={`${"heading"} text-xl text-red-950 font-semibold whitespace-nowrap`}
          >
            Original Artwork.
          </p>
          <div className={`${"paintingsFilters"} flex items-center gap-2`}>
            <form onSubmit={searchHandler} className=" flex items-center">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search for anything..."
                className=" border outline-blue-600 rounded-sm py-1 pl-2"
              />
              <button className=" bg-blue-600 hover:bg-blue-700 text-white text-2xl py-1 px-2 rounded-sm shadow-sm hover:shadow-md border cursor-pointer ml-1">
                <SearchIcon />
              </button>
            </form>
            <div className=" relative">
              <div
                onClick={toggleFilter}
                className=" border py-1 px-2 w-[105px] bg-white flex items-center justify-between cursor-pointer !z-10"
              >
                <p className=" text-base text-gray-700">{filter}</p>
                <p
                  className={`text-base text-gray-700 ease-in-out duration-500 ${
                    openFilter && "rotate-180"
                  }`}
                >
                  <FilterIcon />
                </p>
              </div>
              <div
                ref={filterRef}
                className={`absolute left-0 bg-white ${
                  openFilter ? " block" : "hidden"
                } w-full border shadow-md rounded-sm text-gray-700 ease-in-out duration-700`}
              >
                <p
                  onClick={() => handleSelectFilter("All")}
                  className=" text-base py-1 px-2 border-b hover:text-blue-700 hover:bg-blue-50 cursor-pointer"
                >
                  All
                </p>
                <p
                  onClick={() => handleSelectFilter("Painting")}
                  className=" text-base py-1 px-2 border-b hover:text-blue-700 hover:bg-blue-50 cursor-pointer"
                >
                  Paintings
                </p>
                <p
                  onClick={() => handleSelectFilter("Sculpture")}
                  className=" text-base py-1 px-2 border-b hover:text-blue-700 hover:bg-blue-50 cursor-pointer"
                >
                  Sculptures
                </p>
                <p
                  onClick={() => handleSelectFilter("Textile")}
                  className=" text-base py-1 px-2 border-b hover:text-blue-700 hover:bg-blue-50 cursor-pointer"
                >
                  Textile
                </p>
                <p
                  onClick={() => handleSelectFilter("Jewelry")}
                  className=" text-base py-1 px-2 border-b hover:text-blue-700 hover:bg-blue-50 cursor-pointer"
                >
                  Jewelry
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {error && <p className=" text-center">{error.message}</p>}
      {loading && <p>Loading...</p>}
      <div className=" w-full py-4">
        <div className=" columns-2 sm:columns-3 md:columns-4 [column-fill:balance]">
          {filteredCategory.map((item: Artwork) => (
            <ArtItem
              key={item.id}
              id={item.id}
              title={item.title}
              heightCm={item.heightCm}
              widthCm={item.widthCm}
              category={item.category}
              material={item.material}
              price={item.price}
              isAvailable={item.isAvailable}
              artworkId={item.id}
              media={item.media}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
