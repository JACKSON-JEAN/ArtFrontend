import React from "react";
import image1 from "../images/Ragland.jpg";
import image2 from "../images/Doug.jpg";
import image3 from "../images/jean.jpg";
import image4 from "../images/Janie.jpg";

const About = () => {
  return (
    <div
      className={`${"wrapper"} w-full px-10 sm:px-16 min-h-screen pt-4 pb-10 bg-slate-50`}
    >
      <section className=" flex-1">
        <div className=" mb-2">
          <p className=" text-lg text-red-950 font-semibold">Our story</p>
          <p className=" font-light mb-4">
            Pearl Art Galleries was born from a deep friendship between U.S. Christian
            businessmen and Jackson Uwizeye, their Ugandan partner. They met
            Jackson as a bright young boy in a Ugandan village, his passion for
            learning inspiring their support through a sponsorship program from
            age 10 until his university graduation. United by a love for
            original art, Jackson now leads this Kampala-based, locally owned
            online business. Together, they curate unique, authentic Ugandan
            art—distinct from mainstream offerings—sourced at fair trade prices.
            Our values of Quality Art, Reliable Service, Fair Trading, and
            Guaranteed Satisfaction ensure every customer is delighted with
            their treasure. Pearl Art Galleries ships globally via DHL within 72 hours of
            receiving the order and the customer will receive a tracking email
            alert. Most importantly, Pearl Art Galleries payments are secured by
            Flutterwave’s world-class, PCI DSS-compliant processing.
          </p>
          <p className="mb-2">
            <span>Mission:</span>{" "}
            <span className=" font-light">
              "To empower African artisans by giving them a global platform
              while preserving cultural helitage."
            </span>
          </p>
          
        </div>
        <div className=" mb-4">
          <p className=" text-lg text-red-950 font-semibold">How we work</p>
          <p>Direct partnerships</p>
          <p className=" font-light mb-2">
            We travel to villages, build relationships with artists, and
            negotiate fair prices directly with no middlemen involved.
          </p>
          <p>Cultural preservation</p>
          <p className=" font-light mb-2">
            We document stories and traditions behind each art form to educate
            buyers.
          </p>
        </div>
      </section>
      <p className=" text-lg text-red-950 font-semibold mb-2">Meet our team.</p>
      <section className=" grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="">
          <img src={image3} alt="Jackson" className=" border rounded-sm" />
          <div>
            <p className=" text-red-950">Owner and President</p>
            <p className=" font-light">Uwizeye Jackon</p>
          </div>
        </div>
        <div>
          <img src={image2} alt="Doug Harris" className=" border rounded-sm" />
          <div>
            <p className=" text-red-950">US Founder.</p>
            <p className=" font-light">Mr. Doug Harris</p>
          </div>
        </div>
        <div className=" ">
          <img src={image1} alt="David Ragland" className=" border rounded-sm w-full" />
          <div>
            <p className=" text-red-950">US Founder.</p>
            <p className=" font-light">Mr. David Ragland</p>
          </div>
        </div>
        <div>
          <img src={image4} alt="Jani" className=" border rounded-sm" />
          <div>
            <p className=" text-red-950">Curator.</p>
            <p className=" font-light">Janie Bianconi</p>
          </div>
        </div>
        
      </section>
    </div>
  );
};

export default About;
