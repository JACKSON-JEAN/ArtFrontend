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
        <section className=" flex justify-between items-center border-b sm:shadow-sm">
          <div
            className={`${"logoSearchWrapper"} flex gap-4 items-center w-full`}
          >
            <p
              onClick={toggleMenu}
              className={`${"open-menu"} block sm:hidden text-red-950 cursor-pointer text-2xl`}
            >
              <MenuIcon />
            </p>
            <h1>
              {/* here */}
              <Link
                onClick={() => setIsMenuOpen(false)}
                to="/"
                className=" text-red-900 font-logo whitespace-nowrap"
              >
                <div className="flex flex-col items-center">
                  <p className="text-2xl -mb-2.5 font-semibold tracking-wide">
                    PEARL ART
                  </p>

                  <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 w-full max-w-[12rem]">
                    <span className="h-[2px] bg-red-900"></span>

                    <p className="text-sm font-semibold tracking-[0.3em]">
                      GALLERIES
                    </p>

                    <span className="h-[2px] bg-red-900"></span>
                  </div>
                </div>
              </Link>
            </h1>
          </div>

          <div className=" flex items-center gap-4 right-4">
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
