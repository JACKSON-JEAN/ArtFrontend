import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import img1 from "../images/art1.jpg";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoMdHeartEmpty, IoIosArrowDown, IoIosSearch } from "react-icons/io";
import { GET_ARTWORK } from "../graphql/artwork";
import { Artwork } from "../types/artwork";

const Collection = () => {
  const ShoppingIcon = HiOutlineShoppingBag as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;
  const WishListIcon = IoMdHeartEmpty as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;
  const FilterIcon = IoIosArrowDown as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;
  const SearchIcon = IoIosSearch as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;
  const[openFilter, setOpenFilter] = useState(false)
  const[filter, setFilter]= useState<string>("All")
  const[search, setSearch] = useState<string>("")

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
    setOpenFilter(!openFilter)
  };

  const handleSelectFilter=(filter: string) =>{
    setFilter(filter)
    console.log(filter.toUpperCase())
    setOpenFilter(false)
  }

  const searchHandler=(e: React.FormEvent)=>{
    e.preventDefault()
    console.log(search)
  }

  return (
    <div
      className={`${"wrapper"} w-full px-10 sm:px-16 min-h-screen py-3 bg-slate-50`}
    >
      <div className=" w-full flex items-center gap-10">
        <div className={`${"paintings"} w-full flex justify-between`}>
          <p className={`${"heading"} text-xl text-red-950 font-semibold whitespace-nowrap`}>
            Original Paintings.
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
                <SearchIcon/>
              </button>
            </form>
            <div className=" relative">
              <div onClick={toggleFilter} className=" border py-1 px-2 w-[105px] bg-white flex items-center justify-between cursor-pointer !z-10">
                <p className=" text-base text-gray-700">{filter}</p>
                <p className={`text-base text-gray-700 ease-in-out duration-500 ${openFilter && "rotate-180"}`}>
                  <FilterIcon/>
                </p>
              </div>
              <div className={`absolute left-0 bg-white ${openFilter ? " block" : "hidden"} w-full border shadow-md rounded-sm text-gray-700 ease-in-out duration-700`}>
                <p onClick={() =>handleSelectFilter("All")} className=" text-base py-1 px-2 border-b hover:text-blue-700 hover:bg-blue-50 cursor-pointer">All</p>
                <p onClick={() =>handleSelectFilter("Painting")} className=" text-base py-1 px-2 border-b hover:text-blue-700 hover:bg-blue-50 cursor-pointer">Paintings</p>
                <p onClick={() =>handleSelectFilter("Sculpture")} className=" text-base py-1 px-2 border-b hover:text-blue-700 hover:bg-blue-50 cursor-pointer">Sculptures</p>
                <p onClick={() =>handleSelectFilter("Textile")} className=" text-base py-1 px-2 border-b hover:text-blue-700 hover:bg-blue-50 cursor-pointer">Textile</p>
                <p onClick={() =>handleSelectFilter("Jewelry")} className=" text-base py-1 px-2 border-b hover:text-blue-700 hover:bg-blue-50 cursor-pointer">Jewelry</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {error && <p className=" text-center">{error.message}</p>}
      <div className=" w-full py-4">
        <div className=" columns-2 sm:columns-3 md:columns-3">
          {filteredCategory.map((item: Artwork) => (
            <div
              key={item.id}
              className=" w-full break-inside-avoid mb-4 border shadow-sm rounded-sm overflow-hidden"
            >
              <img src={item?.media[0].url || img1} alt="" />
              <div className=" px-2 py-2">
                <div className=" flex items-center justify-between">
                  <p className=" font-semibold text-lg">${item.price}</p>
                  <div className=" flex items-center gap-2">
                    <p className=" text-xl cursor-pointer">
                      <WishListIcon />
                    </p>
                    <p className=" text-xl cursor-pointer">
                      <ShoppingIcon />
                    </p>
                  </div>
                </div>
                <p className=" text-lg">{item.title}</p>
                {item.widthCm && (
                  <p className=" text-gray-600">
                    {item.widthCm} X {item.heightCm} Cm
                  </p>
                )}
              </div>
            </div>
          ))}
          {loading && <p>Loading...</p>}
        </div>
      </div>
      {/* <Products subTitle='Our Collection' /> */}
    </div>
  );
};

export default Collection;
