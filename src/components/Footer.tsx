import React from "react";
import { IoLogoTwitter } from "react-icons/io5";
import { Link } from "react-router-dom";

const Footer = () => {
  const TwitterIcon = IoLogoTwitter as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;

  return (
    <div className={` text-white`}>
      <section className={`${"wrapper"} grid sm:gap-20 grid-cols-2 sm:grid-cols-3 px-10 sm:px-20 py-4 bg-blue-950`}>
        <section className=" mb-4 sm:mb-0">
        <p className=" capitalize text-lg font-semibold">ZubArt</p>
        <p className=" capitalize text-base italic font-light">Art that speaks every language.</p>
        </section>
        <section className=" mb-4 sm:mb-0">
          <p className=" capitalize text-base font-semibold">quick links</p>
          <ul>
            <li className=" mt-1"><Link to="about" className=" text-base py-1 font-thin capitalize hover:text-slate-200">About us</Link></li>
            <li className=" mt-1"><Link to="contact" className=" text-base py-1 font-thin capitalize hover:text-slate-200">Contact us</Link></li>
            <li className=" mt-1"><Link to="collection" className=" text-base py-1 font-thin capitalize hover:text-slate-200">Our Collection</Link></li>
            <li className=" mt-1"><Link to="cart" className=" text-base py-1 font-thin capitalize hover:text-slate-200">Shopping Cart</Link></li>
          </ul>
        </section>
        <section className=" mb-4 sm:mb-0">
          <p className=" capitalize text-base font-semibold">Social handles</p>
          <ul>
            <li className=" mt-1"><Link to="#" className=" text-base py-1 font-thin capitalize hover:text-slate-200">Email</Link></li>
            <li className=" mt-1"><Link to="#" className=" text-base py-1 font-thin capitalize hover:text-slate-200">Twitter</Link></li>
            <li className=" mt-1"><Link to="#" className=" text-base py-1 font-thin capitalize hover:text-slate-200">FaceBook</Link></li>
            <li className=" mt-1"><Link to="#" className=" text-base py-1 font-thin capitalize hover:text-slate-200">Instagram</Link></li>
          </ul>
        </section>
        {/* <section className=" mb-4 sm:mb-0">
          <p className=" capitalize text-base font-semibold">
            News Letter Signup
          </p>
          <form action="">
            <div className=" flex py-2 rounded-sm overflow-hidden ">
              <input
                className=" w-40 pl-2 py-0.5 border-none outline-none text-blue-950"
                type="text"
                placeholder="Email..."
              />
              <button className=" bg-blue-500 hover:bg-blue-600 px-1">
                Submit
              </button>
            </div>
          </form>
        </section> */}
      </section>
      <section className=" bg-slate-800 py-4 border-t">
        <p className=" text-base capitalize px-10 sm:px-20 flex justify-center font-light">copyright &copy; {new Date().getFullYear()} ZubArt</p>
      </section>
    </div>
  );
};

export default Footer;
