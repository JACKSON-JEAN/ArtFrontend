//changes

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ARTWORK } from "../graphql/artwork";
import { Artwork } from "../types/artwork";
import ArtItem from "../components/ArtItem";
import { Helmet } from "@dr.pogodin/react-helmet";
import ArtFilters, { ArtFilterState } from "../components/FilterSelection";
import { AnimatePresence, motion } from "framer-motion";
import { MdOutlineFilterList } from "react-icons/md";
import { RiCloseLine } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";

const defaultFilters: ArtFilterState = {
  category: "all",
  availability: "all",
  material: "all",
  price: "all",
};

const Collection = () => {
  const [search, setSearch] = useState("");
  const [openFilters, setOpenFilters] = useState(false);
  const [filters, setFilters] = useState<ArtFilterState>(defaultFilters);

  const FilterIcon = MdOutlineFilterList as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;
  const EmptySearchIcon = RiCloseLine as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;
  const SearchIcon = IoSearch as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;

  // --- Infinite scroll states ---
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const [fetchingMore, setFetchingMore] = useState(false);

  const { loading, error, data, refetch, fetchMore } = useQuery(GET_ARTWORK, {
    variables: { searchInput: { keyword: search, limit: 12 } },
    notifyOnNetworkStatusChange: true,
  });

  const isOffline = !navigator.onLine;

  // --- Update artworks when data changes ---
  useEffect(() => {
    if (data?.getArtwork) {
      setArtworks(data.getArtwork.artworks);
      setNextCursor(data.getArtwork.nextCursor ?? null);
    }
  }, [data]);

  // --- Load more artworks ---

  const loadMore = useCallback(async () => {
  if (!nextCursor || fetchingMore || isOffline) return;
  setFetchingMore(true);

  try {
    const { data: moreData } = await fetchMore({
      variables: {
        searchInput: { keyword: search, limit: 12, cursor: nextCursor },
      },
    });
    setArtworks((prev) => [...prev, ...moreData.getArtwork.artworks]);
    setNextCursor(moreData.getArtwork.nextCursor ?? null);
  } finally {
    setFetchingMore(false);
  }
}, [nextCursor, fetchingMore, fetchMore, search, isOffline]);


  // --- Intersection Observer for infinite scroll ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { threshold: 0.5 }
    );

    const sentinel = document.querySelector("#scroll-sentinel");
    if (sentinel) observer.observe(sentinel);

    return () => observer.disconnect();
  }, [loadMore]);

  /* ---------------- RESET ---------------- */
  const canReset =
    filters.category !== "all" ||
    filters.availability !== "all" ||
    filters.material !== "all" ||
    filters.price !== "all";

  /* ---------------- FILTER CHANGE (CLOSE DRAWER) ---------------- */
  const handleFilterChange = (newFilters: ArtFilterState) => {
    setFilters(newFilters);
    setOpenFilters(false); // 👈 CLOSE AFTER SELECTION
  };

  /* ---------------- FILTERING ---------------- */
  const filteredArtwork = artworks.filter((item) => {
    if (filters.category !== "all" && item.category?.toLowerCase() !== filters.category)
      return false;

    if (
      filters.availability !== "all" &&
      item.isAvailable !== (filters.availability === "available")
    )
      return false;

    if (filters.material !== "all" && item.material?.toLowerCase() !== filters.material)
      return false;

    if (filters.price !== "all") {
      const price = item.price;
      if (filters.price === "under-300" && price >= 300) return false;
      if (filters.price === "300-500" && (price < 300 || price > 499)) return false;
      if (filters.price === "500-800" && (price < 500 || price > 799)) return false;
      if (filters.price === "800-1000" && (price < 800 || price > 999)) return false;
      if (filters.price === "1000-plus" && price < 1000) return false;
    }

    return true;
  });

  /* ---------------- COUNTS ---------------- */
  const counts = useMemo(() => {
    return {
      category: {
        all: artworks.length,
        painting: artworks.filter((a) => a.category?.toLowerCase() === "painting").length,
        drawing: artworks.filter((a) => a.category?.toLowerCase() === "drawing").length,
        sculpture: artworks.filter((a) => a.category?.toLowerCase() === "sculpture").length,
        textile: artworks.filter((a) => a.category?.toLowerCase() === "textile").length,
        jewelry: artworks.filter((a) => a.category?.toLowerCase() === "jewelry").length,
      },
      availability: {
        all: artworks.length,
        available: artworks.filter((a) => a.isAvailable).length,
        sold: artworks.filter((a) => !a.isAvailable).length,
      },
      material: {
        all: artworks.length,
        "acrylic on canvas": artworks.filter(
          (a) => a.material?.trim().toLowerCase() === "acrylic on canvas"
        ).length,
        "oil on canvas": artworks.filter(
          (a) => a.material?.trim().toLowerCase() === "oil on canvas"
        ).length,
      },
      price: {
        all: artworks.length,
        "under-300": artworks.filter((a) => a.price < 300).length,
        "300-500": artworks.filter((a) => a.price >= 300 && a.price <= 499).length,
        "500-800": artworks.filter((a) => a.price >= 500 && a.price <= 799).length,
        "800-1000": artworks.filter((a) => a.price >= 800 && a.price <= 999).length,
        "1000-plus": artworks.filter((a) => a.price >= 1000).length,
      },
    };
  }, [artworks]);

  useEffect(() => {
    const handleOnline = () => refetch();
    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, [refetch]);

  return (
    <>
      <Helmet>
        <title>Shop Original African Artwork | Pearl Art Galleries</title>
      </Helmet>

      <div className="wrapper w-full px-10 sm:px-16 min-h-screen pb-10 bg-slate-100">
        {/* Top bar */}
        <div className=" bg-slate-100 py-4 sticky top-[53px] sm:top-[95px] md:top-[95px] z-10 flex items-center gap-3 justify-between">
          <button
            onClick={() => setOpenFilters(true)}
            className="font-medium hover:text-blue-500 flex items-center gap-1"
          >
            <FilterIcon className="text-lg" />
            <span>Filters</span>
          </button>

          <form className="flex items-center">
            <div className="relative">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="border rounded-sm outline-blue-500 py-1.5 pl-2 w-64 sm:w-96"
              />
              {search && (
                <div
                  onClick={() => setSearch("")}
                  className="flex justify-center items-center absolute right-0.5 top-0.5 bg-blue-500 h-[calc(100%-4px)] w-8 cursor-pointer rounded-sm shadow-sm"
                >
                  <p className="text-white text-lg font-semibold">
                    <EmptySearchIcon />
                  </p>
                </div>
              )}

              {!search && (
                <div className="flex justify-center items-center absolute right-0.5 top-0.5 bg-blue-500 h-[calc(100%-4px)] w-8 cursor-pointer rounded-sm shadow-sm">
                  <p className="text-white text-lg font-semibold">
                    <SearchIcon />
                  </p>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* FILTER DRAWER */}
        <AnimatePresence>
          {openFilters && (
            <motion.div
              className="fixed inset-0 z-40 bg-black/40 cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenFilters(false)}
            >
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "tween", duration: 0.25 }}
                className="fixed left-0 top-0 h-full w-[280px] bg-white shadow-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <ArtFilters
                  filters={filters}
                  onChange={handleFilterChange}
                  onReset={() => {
                    setFilters(defaultFilters);
                    setOpenFilters(false);
                  }}
                  canReset={canReset}
                  counts={counts}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CONTENT */}
        <div>
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

          {loading && artworks.length === 0 && (
            <p className="text-center text-slate-400">Loading artworks…</p>
          )}

          {!error && filteredArtwork.length === 0 && !loading && (
            <div className="w-full text-center py-20 text-slate-500">
              <p className="text-lg font-medium">No artworks found</p>
              <p className="text-sm mt-1">
                Try adjusting or resetting your filters.
              </p>
            </div>
          )}

          {filteredArtwork.length > 0 && (
            <div className="columns-2 sm:columns-3 md:columns-4 gap-4 [column-fill:balance]">
              {filteredArtwork.map((item) => (
                <ArtItem
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  imageHash={item.imageHash}
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
          )}

          {/* Sentinel for infinite scroll */}
          <div id="scroll-sentinel" className="h-1"></div>
          {fetchingMore && (
            <p className="text-center py-4 text-slate-400">Loading more artworks…</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Collection;
