import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SIGN_IN_MUTATION } from "../graphql/users";
import { GET_CLIENT_CART } from "../graphql/cart";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { getUserId, getUserRole } from "../utils/decodeToken";

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

  const userId = getUserId();
  const navigate = useNavigate();

  const [signIn, { loading }] = useMutation(SIGN_IN_MUTATION, {
    onCompleted: (data) => {
      const { accessToken, refreshToken } = data.signIn;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      const role = getUserRole();

      if (role === "CUSTOMER") navigate("/");
      if (role === "ADMIN") navigate("/dashboard");

      setError({
        isError: false,
        errorMessage: "",
      });
      setUserInput({
        email: "",
        password: "",
      });
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
          email: userInput.email,
          password: userInput.password,
        },
      },
      refetchQueries: [
        { query: GET_CLIENT_CART, variables: { clientId: userId } },
      ],
    });
  };

  return (
    <div className=" w-full flex justify-center px-10 sm:px-20 min-h-screen py-4 bg-slate-50">
      <div className=" flex items-center flex-col">
        <p className=" w-[400px] text-center mb-2">
          <Link
            to="/"
            className="text-xl text-red-950 hover:text-red-900 font-semibold"
          >
            ZubArt
          </Link>
        </p>
        <form
          onSubmit={submitHandler}
          className={` ${"auth"} bg-white w-[300px] py-2 px-3 border rounded-sm`}
        >
          <p className=" text-lg text-red-950 font-semibold mb-3">Sign in</p>
          <div className=" flex-1 flex flex-col mb-3">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className=" border outline-blue-500 rounded-sm pl-2 py-1"
              type="text"
              placeholder="Email..."
              value={userInput.email}
              onChange={(e) => changeHandler("email", e.target.value)}
            />
          </div>

          <div className=" flex-1 flex flex-col mb-3 relative">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className=" border outline-blue-500 rounded-sm pl-2 py-1"
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
          <button className=" w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-sm shadow-sm hover:shadow-md">
            {loading ? "Signing in..." : "SignIn"}
          </button>
          <div className=" mt-4 py-2 border-t">
            <p>
              Have no account?{" "}
              <Link to="/signup" className=" text-blue-600 cursor-pointer">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
