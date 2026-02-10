import { useApolloClient, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SIGN_IN_MUTATION } from "../graphql/users";
// import { GET_CLIENT_CART } from "../graphql/cart";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { decodeToken } from "../utils/decodeToken";
import { useToast } from "../context/ToastContext";
import { useCart } from "../context/cart.context";

const Signin = () => {
  const OpenEye = FaEye as React.ComponentType<React.SVGProps<SVGSVGElement>>;

  const ClosedEye = FaEyeSlash as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    isError: false,
    errorMessage: "",
  });

  const client = useApolloClient();

  // const userId = getUserId();
  const navigate = useNavigate();
  const { success } = useToast();
  const { setUserId } = useCart();

  const [signIn, { loading }] = useMutation(SIGN_IN_MUTATION, {
    onCompleted: async (data) => {
      const { accessToken, refreshToken } = data.signIn;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      const decoded = decodeToken(accessToken);
      if (!decoded) return;
      
      const role = decoded?.role;
      const userId = Number(decoded?.sub);

      await client.resetStore();

      setUserId(userId);

      if (role === "CUSTOMER") navigate("/", { replace: true});
      if (role === "ADMIN") navigate("/dashboard", {replace: true});

      setError({
        isError: false,
        errorMessage: "",
      });
      setUserInput({
        email: "",
        password: "",
      });
      success("Signed in successfully!");
    },
    onError: (error) => {
      const message = error.message.includes("credentials")
        ? "Invalid email or password!"
        : "Something went wrong, please try again!";
      setError({
        isError: true,
        errorMessage: message,
      });
    },
  });

  const changeHandler = (identifier: string, value: string) => {
    setUserInput((prev) => ({
      ...prev,
      [identifier]: value,
    }));
  };

  const emailValidator = /\S+@\S+\.\S+/;

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.email.trim() || !userInput.password.trim()) {
      setError({
        isError: true,
        errorMessage: "Please fill all the necessary fields!",
      });
      return;
    }

    if (!emailValidator.test(userInput.email)) {
      setError({
        isError: true,
        errorMessage: "Please enter a valid email address!",
      });
      return;
    }

    signIn({
      variables: {
        signInData: {
          email: userInput.email.trim().toLowerCase(),
          password: userInput.password,
        }, //changes start here
      },
      // refetchQueries: [
      //   { query: GET_CLIENT_CART, variables: { clientId: userId } },
      // ],
    });
  };

  return (
    <div className=" w-full flex justify-center px-10 sm:px-20 min-h-screen py-4">
      <div className=" flex items-center flex-col">
        <p className=" text-center mb-6">
          <Link
            to="/"
            className=" text-3xl text-red-950 font-semibold font-logo whitespace-nowrap"
          >
            Pearl Art Galleries
          </Link>
        </p>
        <form
          onSubmit={submitHandler}
          className={` ${"auth"} bg-white w-[350px] py-2 px-3 border rounded-sm`}
        >
          <p className=" text-xl text-red-950 font-semibold mb-3">
            Sign in or create account
          </p>
          <div className=" flex-1 flex flex-col mb-3">
            <label className=" text-base" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className=" text-base border outline-blue-500 rounded-sm pl-2 py-1.5"
              type="text"
              placeholder="Email..."
              value={userInput.email}
              onChange={(e) => changeHandler("email", e.target.value)}
            />
          </div>

          <div className=" flex-1 flex flex-col relative mb-4">
            <label className=" text-base" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className=" text-base border outline-blue-500 rounded-sm pl-2 py-1.5"
              type={showPassword ? "text" : "password"}
              placeholder="Password..."
              value={userInput.password}
              onChange={(e) => changeHandler("password", e.target.value)}
            />
            <p
              onClick={() => setShowPassword(!showPassword)}
              className=" absolute right-2 bottom-2 text-gray-500 text-sm cursor-pointer"
            >
              {showPassword ? <OpenEye /> : <ClosedEye />}
            </p>
          </div>

          {error.isError && (
            <p className=" text-xs text-red-700 bg-red-100 rounded-sm mb-2 p-1">
              {error.errorMessage}
            </p>
          )}
          <button
            disabled={loading}
            className=" text-base w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-sm shadow-sm hover:shadow-md"
          >
            {loading ? "Signing in..." : "SIGN IN"}
          </button>
          <div className=" mt-4 py-2 border-t flex justify-center gap-1">
            <p className=" text-base whitespace-nowrap ">
              Have no account?{" "}
              <Link
                to="/signup"
                className=" text-blue-500 hover:text-blue-600 cursor-pointer"
              >
                Sign up
              </Link>
            </p>
            <p>|</p>
            <div>
              <p className=" text-base whitespace-nowrap">
                Forgot{" "}
                <Link
                  className="text-blue-500 hover:text-blue-600"
                  to="/forgot-password"
                >
                  password?
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
