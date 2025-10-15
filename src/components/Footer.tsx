import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";

const Footer = () => {
  const ArrowUpIcon = MdKeyboardDoubleArrowUp as React.ComponentType<
      React.SVGProps<SVGSVGElement>
    >;

  const [showButton, setShowButton] = useState(false);

  // Show button after scrolling down 300px
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="text-white relative">
      <section className="wrapper grid sm:gap-20 grid-cols-2 sm:grid-cols-3 px-10 sm:px-20 py-4 bg-blue-950">
        {/* Company Info */}
        <section className="mb-4 sm:mb-0">
          <p className="capitalize text-lg font-semibold">Pearl Art Galleries</p>
          <p className="capitalize text-base italic font-light">
            Art that speaks every language.
          </p>
        </section>

        {/* Quick Links */}
        <section className="mb-4 sm:mb-0">
          <p className="capitalize text-base font-semibold">Quick Links</p>
          <ul>
            <li className="mt-1">
              <Link
                to="about"
                className="text-base py-1 font-light capitalize hover:text-slate-200"
              >
                About us
              </Link>
            </li>
            <li className="mt-1">
              <Link
                to="contact"
                className="text-base py-1 font-light capitalize hover:text-slate-200"
              >
                Contact us
              </Link>
            </li>
            <li className="mt-1">
              <Link
                to="collection"
                className="text-base py-1 font-light capitalize hover:text-slate-200"
              >
                Our Collection
              </Link>
            </li>
            <li className="mt-1">
              <Link
                to="cart"
                className="text-base py-1 font-light capitalize hover:text-slate-200"
              >
                Shopping Cart
              </Link>
            </li>
          </ul>
        </section>

        {/* Social Handles */}
        <section className="mb-4 sm:mb-0">
          <p className="capitalize text-base font-semibold">Social Handles</p>
          <ul>
            <li className="mt-1">
              <a
                href="mailto:pearlartgalleries@gmail.com"
                className="text-base py-1 font-light capitalize hover:text-slate-200"
              >
                Email
              </a>
            </li>
            <li className="mt-1">
              <a
                href="https://x.com/pearlgalleries"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base py-1 font-light capitalize hover:text-slate-200"
              >
                Twitter
              </a>
            </li>
            <li className="mt-1">
              <a
                href="https://www.facebook.com/pearl.art.galleries"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base py-1 font-light capitalize hover:text-slate-200"
              >
                Facebook
              </a>
            </li>
            <li className="mt-1">
              <a
                href="https://www.instagram.com/pearlartgalleries"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base py-1 font-light capitalize hover:text-slate-200"
              >
                Instagram
              </a>
            </li>
          </ul>
        </section>
      </section>

      {/* Copyright */}
      <section className="bg-slate-800 py-4 border-t">
        <p className="text-base capitalize px-10 sm:px-20 flex justify-center font-light">
          copyright &copy; {new Date().getFullYear()} Pearl Art Galleries
        </p>
      </section>

      {/* Floating Back-to-Top Button */}
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-700 text-white p-3 rounded-full shadow-lg hover:bg-blue-800 transition-colors z-50 text-xl"
          aria-label="Back to top"
        >
          <ArrowUpIcon/>
        </button>
      )}
    </div>
  );
};

export default Footer;
