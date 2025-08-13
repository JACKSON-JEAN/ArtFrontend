import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Local images
import gallery1 from "../images/gallery1.jpeg"
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
    { src: gallery1, alt: "African mask sculpture" },
    { src: img1, alt: "African mask sculpture" },
    { src: img2, alt: "Traditional tribal painting" },
    { src: img3, alt: "Hand-carved wooden art" },
  ];

  return (
    <div className=" p-[3px] rounded-md mb-10 overflow-hidden">
      <div className=" block md:flex w-full md:gap-1 min-h-[200px] md:min-h-[300px]">
        <section className="bg-gradient-to-r from-red-950 to-red-900 rounded-md flex-1 flex items-center mb-4 md:mb-0 py-6">
          <div className="px-4">
            <p className="text-xl md:text-2xl font-thin capitalize font-serif text-white mb-2">
              Welcome to Pearl Art Galleries.
            </p>
            <p className="text-base font-light capitalize text-amber-50 mb-6">
              Winston Churchill called Uganda the "Pearl of Africa" for its
              stunning landscapes and cultural richness. Pearl Art Galleries
              embodies this legacy with authentic Ugandan artworks,
              hand-selected from local artists. These unique pieces bring
              Uganda’s vibrant soul to your home or office, inspiring joy.
            </p>
            <Link
              to="/collection"
              className="bg-amber-50 hover:bg-amber-100 text-red-950 font-semibold px-8 py-1.5 mt-4 capitalize rounded-sm shadow-sm hover:shadow-md"
            >
              Shop now
            </Link>
          </div>
        </section>

        <section className=" flex-1 md:bg-gradient-to-r md:from-red-950 md:to-red-900 rounded-md rounded-r-md overflow-hidden p-1">
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
