import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Local images
import img1 from "../images/art1.jpg";
import img2 from "../images/art2.jpg";
import img3 from "../images/art3.jpg";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
    // fade: true, 
  };

  const images = [
    { src: img1, alt: "African mask sculpture" },
    { src: img2, alt: "Traditional tribal painting" },
    { src: img3, alt: "Hand-carved wooden art" },
  ];

  return (
    <div className="bg-gradient-to-r from-red-950 to-red-900 p-[3px] rounded-md mb-4 overflow-hidden">
      <div className="flex flex-col sm:flex-row w-full min-h-[200px] md:min-h-[300px] rounded-md">
        {/* Text Section */}
        <section className="flex-1 flex items-center py-6">
          <div className="px-4">
            <p className="text-base font-light capitalize text-amber-50">
              Original African Art
            </p>
            <p className="text-xl md:text-2xl font-thin capitalize font-serif text-white mb-6">
              From village hands to global hearts.
            </p>
            <Link to="/collection" className="bg-amber-50 hover:bg-amber-100 text-red-950 font-semibold px-8 py-1.5 mt-4 capitalize rounded-sm shadow-sm hover:shadow-md">
              Shop now
            </Link>
          </div>
        </section>

        {/* Carousel Section */}
        <section className=" hidden sm:block flex-1 bg-amber-50 border-2 border-amber-50 rounded-r-md overflow-hidden">
          <Slider {...settings}>
            {images.map(({ src, alt }, idx) => (
              <div key={idx} className="h-[300px] leading-none">
                <img
                  src={src}
                  alt={alt}
                  className="w-full h-full object-cover block rounded rounded-r-md"
                />
              </div>
            ))}
          </Slider>
        </section>
      </div>
    </div>
  );
};

export default HeroSection;
