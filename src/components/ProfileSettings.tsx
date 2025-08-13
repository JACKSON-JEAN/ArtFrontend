import React, { useEffect, useRef } from "react";
import { getUserEmail, getUserId } from "../utils/decodeToken";
import { useMutation } from "@apollo/client";
import { LOGOUT_MUTATION } from "../graphql/users";
import { GET_CLIENT_CART } from "../graphql/cart";
import { Link } from "react-router-dom";

interface ProfileProps {
    onClose: () => void
}

const ProfileSettings: React.FC<ProfileProps> = ({onClose}) => {
  const [logout, { loading }] = useMutation(LOGOUT_MUTATION);
  const userEmail = getUserEmail();
  const userId = getUserId();

  const profileRef = useRef<HTMLDivElement>(null)

  useEffect(() =>{
    const handleClickOutside = (event: MouseEvent) =>{
        if(
            profileRef.current &&
            !profileRef.current.contains(event.target as Node)
        ){
            onClose()
        }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () =>{
        document.removeEventListener("mousedown", handleClickOutside)
    }
  },[onClose])

  const logoutHandler = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken) {
      try {
        await logout({
          variables: {
            refreshToken: refreshToken,
          },
          refetchQueries: [
            { query: GET_CLIENT_CART, variables: { clientId: userId } },
          ],
        });
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        // navigate("/");
      } catch (error) {
        console.log("Logout failed", error);
      }
    }
  };
  return (
    <div
      className={`${"profile-login"} absolute top-7 -right-[80px] lg:-right-[18px] shadow-xl border w-48 bg-white rounded-sm !z-40`}
    >
      <div ref={profileRef} className=" relative px-3 py-2">
        {userEmail && <p className=" text-sm mb-1">{userEmail}</p>}
        {userEmail && (
          <button
            onClick={logoutHandler}
            className=" bg-red-600 hover:bg-red-700 text-white font-semibold w-full rounded-sm"
          >
            {loading ? "Signing Out..." : "Sign Out"}{" "}
          </button>
        )}
        {!userEmail && (
          <div>
            <Link to="/signin" className=" bg-blue-600 text-center py-1 rounded-sm shadow-sm text-white hover:bg-blue-700 text-sm w-full inline-block">
            Sign In
            </Link>
            <p className=" mt-1 text-xs text-center">New customer?
              {" "}
              <Link to="/signup" className=" text-blue-700 hover:underline">create account</Link>
            </p>
          </div>
        )}
        <div className=" bg-white w-[10px] h-[10px] rotate-45 border-t border-l absolute -top-[6px] left-[98px] z-20"></div>
      </div>
      
    </div>
  );
};

export default ProfileSettings;
