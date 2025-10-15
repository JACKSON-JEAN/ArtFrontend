import React from "react";
import ImageComponent from "../components/ImageComponent";

interface Owner {
  src: string;
  imageHash: string;
  name: string;
  role: string;
}

const owners = [
  {
    src: "https://res.cloudinary.com/dsawd9eso/image/upload/v1760169340/jean_bhijkx.webp",
    imageHash: "LCFFjd?G00?G~0s=?doN^+s;xbxt",
    name: "Uwizeye Jackson",
    role: "Owner and President.",
  },
  {
    src: "https://res.cloudinary.com/dsawd9eso/image/upload/v1760169319/Doug_lxassp.webp",
    imageHash: "LLG[4*vKyYBp~Ar?%MgN$xOsVr#+",
    name: "Mr. Doug Harris",
    role: "US Founder.",
  },
  {
    src: "https://res.cloudinary.com/dsawd9eso/image/upload/v1760169234/Ragland_lsldwc.webp",
    imageHash: "LXLyv7XkS~IV7~r?%2RP~Be.xaM{",
    name: "Mr. David Ragland",
    role: "US Founder.",
  },
  {
    src: "https://res.cloudinary.com/dsawd9eso/image/upload/v1760168636/Janie_qc614p.webp",
    imageHash: "LDJ@ar}d0cXy0Q-qDhD%0fEK%2k7",
    name: "Janie Bianconi",
    role: "Curator.",
  },
];

const About = () => {
  return (
    <>
    <div
      className={`${"wrapper"} w-full px-10 sm:px-16 min-h-screen pt-4 pb-10 bg-slate-50`}
    >
      <section className=" flex-1">
        <div className=" mb-2">
          <h1 className=" text-xl text-red-950 font-semibold">Our story</h1>
          <p className=" font-light mb-4">
            Pearl Art Galleries was born from a deep friendship between U.S.
            Christian businessmen and Jackson Uwizeye, their Ugandan partner.
            They met Jackson as a bright young boy in a Ugandan village, his
            passion for learning inspiring their support through a sponsorship
            program from age 10 until his university graduation. United by a
            love for original art, Jackson now leads this Kampala-based, locally
            owned online business. Together, they curate unique, authentic
            Ugandan art—distinct from mainstream offerings—sourced at fair trade
            prices. Our values of Quality Art, Reliable Service, Fair Trading,
            and Guaranteed Satisfaction ensure every customer is delighted with
            their treasure. Pearl Art Galleries ships globally via DHL within 72
            hours of receiving the order and the customer will receive a
            tracking email alert. Most importantly, Pearl Art Galleries payments
            are secured by Flutterwave’s world-class, PCI DSS-compliant
            processing.
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
          <h2 className=" text-lg text-red-950 font-semibold">How we work</h2>
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
        
        {owners.map((owner: Owner, index) => (
          <div key={index}>
            <ImageComponent src={owner.src} name={owner.name} imageHash={owner.imageHash} />
            <div>
              <p className=" text-red-950">{owner.role}</p>
              <p className=" font-light">{owner.name}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
    </>
  );
};

export default About;
