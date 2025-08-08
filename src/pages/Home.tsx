import React, { useEffect } from "react";
import Products from "../components/Products";
import HeroSection from "../components/HeroSection";
import { useSearch } from "../context/search.context";
import Categories from "../components/Categories";
import SubServices from "../components/SubServices";
import FeaturedArtwork from "../components/FeaturedArtwork";
import NewArrivals from "./NewArrivals";
import HomeBanner from "../components/HomeBanner";
import Subscribe from "../components/Subscribe";

const Home = () => {
  const {query, setQuery} = useSearch()
  useEffect(() =>{
    setQuery("")
  }, [query])

  return (
    <div className={`${"wrapper "} w-full px-10 sm:px-16 min-h-screen pt-3 bg-slate-50`}>
      <HeroSection />
      <SubServices />
      <FeaturedArtwork />
      <Categories />
      <HomeBanner/>
      <NewArrivals />
      <Products limit={4} subTitle="Our Collection"/>
      <Subscribe/>
    </div>
  );
};

export default Home;
