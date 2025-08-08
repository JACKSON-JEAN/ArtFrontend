import React, { FormEvent, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { IoPersonOutline, IoCartOutline } from "react-icons/io5";
import { IoCheckmarkCircle } from "react-icons/io5";
import { BsQuestionCircle } from "react-icons/bs";
import { useSearch } from "../context/search.context";
import { useCart } from "../context/cart.context";
import { getUserEmail } from "../utils/decodeToken";
import ProfileSettings from "./ProfileSettings";

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
  const HelpIcon = BsQuestionCircle as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;
  const clientEmail = getUserEmail();
  const { cart } = useCart();
  const { setQuery } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [displayProfile, setDisplayProfile] = useState(false)

  const searchHandler = (e: FormEvent) => {
    e.preventDefault();
    setQuery(search.trim());
    if (location.pathname !== "/cart") {
      navigate("/collection");
    }
  };

  return (
    <>
      <div
        className={`${"wrapper"} sticky top-0 z-40 bg-white border-b px-10 sm:px-16 py-3`}
      >
        <section className="flex justify-between items-center">
          <div className={`${"logoSearchWrapper"} items-center w-full`}>
            <Link
              to="/"
              className="text-3xl text-red-950 font-semibold font-serif"
            >
              ZubArt
            </Link>
            <form
              onSubmit={searchHandler}
              className={`${"searchForm"} outline-blue-600 rounded-sm whitespace-nowrap relative`}
            >
              <input
                className={`${"search"} border rounded-sm outline-blue-600 px-2 py-1 mr-1 text-slate-500`}
                placeholder="Search artwork"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className={`${"searchBtn"} bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 shadow-sm hover:shadow-md mr-0.5 rounded-sm`}
              >
                Search
              </button>
            </form>
          </div>

          <div className="flex items-center gap-4 absolute right-4 sm:right-16 top-5">
            <div className={`${"profile-wrapper"} relative`}>
              <div
                onClick={()=>setDisplayProfile(!displayProfile)}
                className="border-b-2 border-white cursor-pointer hover:text-blue-600 flex items-center gap-1"
              >
                <PersonIcon className=" " />
                <span className=" lg:block hidden">Account</span>
                {clientEmail && (
                  <p className=" absolute text-[12px] top-2 left-2 bg-white rounded-full">
                    <SignedInIcon />{" "}
                  </p>
                )}
                
              </div>
              {displayProfile && <ProfileSettings onClose={() =>setDisplayProfile(false)} />}
            </div>
            <NavLink
              to="contact"
              className="border-b-2 border-white hover:text-blue-600 flex items-center gap-1"
            >
              <HelpIcon />
              <span className=" lg:block hidden">Help</span>
            </NavLink>

            <NavLink
              to="cart"
              className="text-xl cursor-pointer hover:text-blue-600 p-1 rounded-full flex items-center gap-1 capitalize relative"
            >
              <CartIcon />
              <span className="text-base lg:block hidden">cart</span>
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
      </div>
    </>
  );
};

export default Navbar;
