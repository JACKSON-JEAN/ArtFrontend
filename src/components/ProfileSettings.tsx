import React, { useEffect, useRef } from "react";
import { getUserEmail, getUserId } from "../utils/decodeToken";
import { useApolloClient, useMutation } from "@apollo/client";
import { LOGOUT_MUTATION } from "../graphql/users";
import { GET_CLIENT_CART } from "../graphql/cart";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import { GET_ADDRESSES_BY_CUSTOMER_ID } from "../graphql/addresses";
import { useCart } from "../context/cart.context";

interface ProfileProps {
  onClose: () => void;
}

const ProfileSettings: React.FC<ProfileProps> = ({ onClose }) => {
  const [logout, { loading }] = useMutation(LOGOUT_MUTATION);
  const userEmail = getUserEmail();
  const userId = getUserId();
  const navigate = useNavigate();

  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const { success } = useToast();
  const client = useApolloClient();
  const { clearCart, setUserId } = useCart();

  const logoutHandler = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  try {
    if (refreshToken) {
      await logout({
        variables: { refreshToken },
        refetchQueries: [
          { query: GET_CLIENT_CART, variables: { clientId: userId } },
          { query: GET_ADDRESSES_BY_CUSTOMER_ID, variables: { customerId: userId } },
        ],
      });
    }
    clearCart();
    setUserId(null)
    await client.resetStore();
    success("Signed out successfully!");
  } catch (error) {
    console.log("Logout failed", error);
  } finally {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    onClose();
    navigate("/");
  }
};

  return (
    <div
      className={`${"profile-login"} absolute top-7 -right-[50px] lg:-right-[18px] shadow-xl border min-w-48 w-auto bg-white rounded-sm !z-40`}
    >
      <div ref={profileRef} className=" relative px-3 py-3">
        {userEmail && <p className=" text-base whitespace-nowrap mb-1">{userEmail}</p>}
        {userEmail && (
          <button
            disabled={loading}
            onClick={logoutHandler}
            className=" bg-red-600 hover:bg-red-700 text-base py-1 text-white font-semibold w-full rounded-sm"
          >
            {loading ? "Signing Out..." : "Sign Out"}{" "}
          </button>
        )}
        {!userEmail && (
          <div>
            <Link
              to="/signin"
              className=" bg-blue-600 text-center py-1 rounded-sm shadow-sm text-white hover:bg-blue-700 text-base w-full inline-block"
            >
              Sign In
            </Link>
            <p className=" mt-1 text-base whitespace-nowrap text-center">
              New customer?{" "}
              <Link to="/signup" className=" text-blue-700 hover:underline">
                create account
              </Link>
            </p>
          </div>
        )}
        {/* <div className=" bg-white w-[10px] h-[10px] rotate-45 border-t border-l absolute -top-[6px] left-[125px] sm:left-[98px] z-20"></div> */}
      </div>
    </div>
  );
};

export default ProfileSettings;
