import React from "react";
import painterImg from "../images/painter.jpg"

const About = () => {
  return (
    <div className={`${"wrapper"} w-full flex flex-col md:flex-row md:gap-3 px-10 sm:px-16 min-h-screen py-4 bg-slate-50`}>
      <section className=" flex-1">
        <div className=" mb-2">
          <p className=" text-lg text-red-950 font-semibold">Our story</p>
          <p className=" font-light">
            After witnessing the skills of talented African artisans, we founded
            ZubArt to bridge continents througth art.
          </p>
          <p>
            <span>Mission:</span>{" "}
            <span className=" font-light">
              "To empower African artisans by giving them a global platform
              while preserving cultural helitage."
            </span>
          </p>
          <p>
            <span>Name meaning:</span>{" "}
            <span className=" font-light">
              "Zuba" means "sun" symbolising how we illuminate Africa's
              brilliance.
            </span>
          </p>
        </div>
        <div className=" mb-4">
          <p className=" text-lg text-red-950 font-semibold">How we work</p>
          <p>Direct partnerships</p>
          <p className=" font-light">We travel to villages, build relationships with artists, and negotiate fair prices directly with no middlemen involved.</p>
          <p>Cultural preservation</p>
          <p className=" font-light">We document stories and traditions behind each art form to educate buyers.</p>
        </div>
      </section>
      <section className=" flex-1">
        <div className=" bg-white border p-2">
            <img src={painterImg} alt="" />
        </div>
        <p className=" text-red-950">Celebrating African Artistry, one story at a time.</p>
        <p className=" font-light">From village hands to global hearts - meet the people behind your art.</p>
      </section>
    </div>
  );
};

export default About;
