import React from "react";

import { Link } from "react-router-dom";

const HeroSection = () => {


  return (
    <div className=" p-[3px] rounded-md mb-10 overflow-hidden">
      <div className=" block md:flex w-full md:gap-1 min-h-[200px] md:min-h-[300px]">
        <section className="bg-gradient-to-r from-red-950 to-red-900 rounded-md flex-1 flex items-center mb-4 md:mb-0 py-6">
          <div className="px-4 sm:px-10 md:px-20">
            <h1 className="text-xl md:text-2xl font-thin capitalize font-serif text-white mb-2">
              Welcome to Pearl Art Galleries
            </h1>
            <p className="text-lg font-light text-amber-50 mb-6">
              Winston Churchill called Uganda the "Pearl of Africa" for its
              stunning landscapes and cultural richness. Pearl Art Galleries
              embodies this legacy with original Ugandan artworks,
              hand-selected from local artists. These unique pieces bring
              Uganda’s vibrant soul to your home or office, inspiring joy.
            </p>
            
            <Link
              to="/collection"
              className="bg-amber-50 hover:bg-amber-100 text-red-950 font-semibold px-8 py-2 capitalize rounded-sm shadow-sm hover:shadow-md text-base"
            >
              Shop now
            </Link>
            
          </div>
        </section>

        
      </div>
    </div>
  );
};

export default HeroSection;
