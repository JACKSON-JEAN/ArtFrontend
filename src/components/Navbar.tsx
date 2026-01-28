import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  IoPersonOutline,
  IoCartOutline,
  IoCheckmarkCircle,
  IoMenuSharp,
} from "react-icons/io5";
import { FaTimes } from "react-icons/fa";
import { useCart } from "../context/cart.context";
import { getUserEmail } from "../utils/decodeToken";
import ProfileSettings from "./ProfileSettings";
import { linkClasses } from "../utils/CssUtils";
import logo from "../images/logo3.webp"

const Navbar = () => {
  const PersonIcon = IoPersonOutline as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;
  const SignedInIcon = IoCheckmarkCircle as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;
  const CartIcon = IoCartOutline as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;
  const MenuIcon = IoMenuSharp as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;
  const CloseIcon = FaTimes as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;
  const clientEmail = getUserEmail();
  const { cart } = useCart();

  const [displayProfile, setDisplayProfile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // console.log("clicked")
  };

  return (
    <>
      <div
        className={`${"wrapper"} sticky top-0 z-40 bg-white border-b px-10 sm:px-16`}
      >
        <section className=" flex justify-between items-center border-b sm:shadow-sm py-[7px]">
          <div
            className={`${"logoSearchWrapper"}`}
          >
            <h1 className=" ">
              {/* stop */}
              <Link
                onClick={() => setIsMenuOpen(false)}
                to="/"
                className=" text-red-900 font-logo whitespace-nowrap"
              >
                <img src={logo} alt="logo" className=" w-48"/>
                
              </Link>
            </h1>
          </div>

          <div className=" flex items-center gap-5 right-4">
            <div
              onClick={() => setIsMenuOpen(false)}
              className={`${"profile-wrapper"} relative bg-white`}
            >
              <div
                onClick={() => setDisplayProfile(!displayProfile)}
                className="border-b-2 border-white cursor-pointer hover:text-blue-600 flex items-center gap-1"
              >
                <PersonIcon className=" text-xl" />
                <span className=" sm:block hidden">Account</span>
                {clientEmail && (
                  <p className=" absolute text-[12px] top-2 left-2 bg-white rounded-full">
                    <SignedInIcon />{" "}
                  </p>
                )}
              </div>
              {displayProfile && (
                <div className=" bg-white w-[10px] h-[10px] rotate-45 border-t border-l absolute -bottom-[12px] sm:-bottom-[9px] left-[5px] z-50"></div>
              )}
              {displayProfile && (
                <ProfileSettings onClose={() => setDisplayProfile(false)} />
              )}
            </div>

            <NavLink
              onClick={() => setIsMenuOpen(false)}
              to="cart"
              className="text-xl cursor-pointer hover:text-blue-600 p-1 rounded-full flex items-center gap-1 capitalize relative"
            >
              <CartIcon className=" text-2xl" />
              <span className="text-base sm:block hidden">cart</span>
              {cart.length > 0 && (
                <div className="absolute left-3 bottom-4 bg-red-600 border border-white w-[18px] h-[18px] rounded-full flex justify-center items-center">
                  <p className="text-white text-[11px] font-semibold">
                    {cart.length}
                  </p>
                </div>
              )}
            </NavLink>
            <p
              onClick={toggleMenu}
              className={`${"open-menu"} block sm:hidden text-red-950 cursor-pointer text-2xl`}
            >
              <MenuIcon />
            </p>
          </div>
        </section>
        <div
          onClick={toggleMenu}
          className={`${
            isMenuOpen ? " block" : " hidden"
          } absolute left-0 w-full h-screen bg-black bg-opacity-10 z-10 ease-in-out duration-700`}
        ></div>
        <section
          className={`${"navigation"} ${
            !isMenuOpen ? " -left-full sm:left-0" : " left-0"
          } absolute ease-in-out duration-500 sm:relative w-4/5 sm:w-auto h-screen sm:h-auto border-l-[1px] sm:border-l-0 bg-slate-50 border-r sm:border-r-0 sm:bg-white z-30`}
        >
          <div
            onClick={toggleMenu}
            className=" sm:hidden menu flex justify-between items-center gap-1 py-2 border-b border-t px-2 bg-white"
          >
            <p className=" text-base font-semibold">Menu</p>
            <p className=" hover:text-blue-700 cursor-pointer">
              <CloseIcon />
            </p>
          </div>
          <nav className=" flex flex-col sm:flex-row gap-0 sm:gap-[34px] ">
            <NavLink
              onClick={() => setIsMenuOpen(false)}
              to="/"
              className={({ isActive }) => linkClasses(isActive)}
            >
              Home
            </NavLink>
            <NavLink
              onClick={() => setIsMenuOpen(false)}
              to="collection"
              className={({ isActive }) => linkClasses(isActive)}
            >
              Artwork
            </NavLink>
            <NavLink
              onClick={() => setIsMenuOpen(false)}
              to="about"
              className={({ isActive }) => linkClasses(isActive)}
            >
              About Us
            </NavLink>
            <NavLink
              onClick={() => setIsMenuOpen(false)}
              to="artists"
              className={({ isActive }) => linkClasses(isActive)}
            >
              Artists
            </NavLink>
            <NavLink
              onClick={() => setIsMenuOpen(false)}
              to="reviews"
              className={({ isActive }) => linkClasses(isActive)}
            >
              Reviews
            </NavLink>
            <NavLink
              onClick={() => setIsMenuOpen(false)}
              to="contact"
              className={({ isActive }) => linkClasses(isActive)}
            >
              Contact Us
            </NavLink>
          </nav>
        </section>
      </div>
    </>
  );
};

export default Navbar;
