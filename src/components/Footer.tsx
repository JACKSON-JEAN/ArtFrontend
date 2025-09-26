import { Link } from "react-router-dom";

const Footer = () => {

  return (
    <div className={` text-white`}>
      <section className={`${"wrapper"} grid sm:gap-20 grid-cols-2 sm:grid-cols-3 px-10 sm:px-20 py-4 bg-blue-950`}>
        <section className=" mb-4 sm:mb-0">
        <p className=" capitalize text-lg font-semibold">Pearl Art Galleries</p>
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
            <li className=" mt-1">
              <a href="mailto:pearlartgalleries@gmail.com" className=" text-base py-1 font-thin capitalize hover:text-slate-200">Email</a>
            </li>
            <li className=" mt-1">
              <a href="https://x.com/pearlgalleries" className=" text-base py-1 font-thin capitalize hover:text-slate-200">Twitter</a>
            </li>
            <li className=" mt-1">
              <a href="https://www.facebook.com/pearl.art.galleries" className=" text-base py-1 font-thin capitalize hover:text-slate-200">FaceBook</a>
            </li>
            <li className=" mt-1">
              <a href="https://www.instagram.com/pearlartgalleries" className=" text-base py-1 font-thin capitalize hover:text-slate-200">Instagram</a>
            </li>
          </ul>
        </section>

      </section>
      <section className=" bg-slate-800 py-4 border-t">
        <p className=" text-base capitalize px-10 sm:px-20 flex justify-center font-light">copyright &copy; {new Date().getFullYear()} Pearl Art Galleries</p>
      </section>
    </div>
  );
};

export default Footer;
