import { useMutation } from "@apollo/client";
import React, { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { SIGN_UP_MUTATION } from "../graphql/users";

const Signup = () => {
  const OpenEye = FaEye as React.ComponentType<React.SVGProps<SVGSVGElement>>;

  const ClosedEye = FaEyeSlash as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigate = useNavigate();

  const [fieldErrors, setFieldErrors] = useState<string[]>([]); // 🔹 Store multiple backend errors
  const [generalError, setGeneralError] = useState<string>("");

  const [userInput, setUserInput] = useState({
    fullName: "",
    email: "",
    telephone: "",
    password: "",
  });

  const passwordRegex =
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

  const [signUp, { loading }] = useMutation(SIGN_UP_MUTATION, {
    onCompleted: () => {
      navigate("/signin");
    },
    onError: (error) => {
      // 🔹 Extract validation errors from GraphQL if available
      const validationErrors = Array.isArray(
        (error.graphQLErrors[0]?.extensions?.originalError as any)?.message
      )
        ? (error.graphQLErrors[0]?.extensions?.originalError as any).message
        : [
            (error.graphQLErrors[0]?.extensions?.originalError as any)
              ?.message || error.message,
          ];

      if (Array.isArray(validationErrors)) {
        setFieldErrors(validationErrors);
      } else {
        setGeneralError(error.message || "Sign-up failed");
      }
    },
  });

  const changeHandler = (identifier: string, value: string) => {
    setUserInput((prev) => ({
      ...prev,
      [identifier]: value,
    }));
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setFieldErrors([]);
    setGeneralError("");

    // 🔹 Basic frontend validation before hitting backend
    if (
      !userInput.fullName.trim() ||
      !userInput.email.trim() ||
      !userInput.telephone.trim() ||
      !userInput.password.trim()
    ) {
      setGeneralError("Please fill all the fields");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(userInput.email)) {
      setGeneralError("Invalid email address");
      return;
    }

    if (userInput.password.length < 8) {
      setGeneralError("Password must be at least 8 characters long");
      return;
    }

    if (!passwordRegex.test(userInput.password)) {
      setGeneralError(
        "Password is too weak. Must have uppercase, lowercase, and a special character."
      );
      return;
    }

    await signUp({
      variables: {
        signUpData: {
          fullName: userInput.fullName,
          email: userInput.email.trim().toLowerCase(),
          phone: userInput.telephone,
          password: userInput.password,
        },
      },
    });
  };

  return (
    <div className="w-full flex justify-center px-10 sm:px-20 min-h-screen py-4 bg-slate-50">
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
          className={`${"auth"} bg-white w-[350px] py-2 px-3 border rounded-sm relative`}
        >
          <p className=" text-xl text-red-950 font-semibold mb-3">Create account or sign in</p>

          <div className="flex-1 flex flex-col mb-3">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              className="border outline-blue-500 rounded-sm pl-2 py-1.5"
              type="text"
              placeholder="Full name..."
              value={userInput.fullName}
              onChange={(e) => changeHandler("fullName", e.target.value)}
            />
          </div>

          <div className="flex-1 flex flex-col mb-3">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="border outline-blue-500 rounded-sm pl-2 py-1.5"
              type="text"
              placeholder="Email..."
              value={userInput.email}
              onChange={(e) => changeHandler("email", e.target.value)}
            />
          </div>
          <div className="flex-1 flex flex-col mb-3">
            <label htmlFor="telephone">Telephone</label>
            <input
              id="telephone"
              className="border outline-blue-500 rounded-sm pl-2 py-1.5"
              type="text"
              placeholder="Telephone..."
              value={userInput.telephone}
              onChange={(e) => changeHandler("telephone", e.target.value)}
            />
          </div>

          <div className="flex-1 flex flex-col mb-3 relative">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className="border outline-blue-500 rounded-sm pl-2 py-1.5"
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

          {generalError && (
            <p className="text-xs text-red-700 bg-red-100 rounded-sm mb-2 p-1">
              {generalError}
            </p>
          )}

          {fieldErrors.length > 0 && (
            <ul className="text-xs text-red-700 bg-red-100 rounded-sm mb-2 p-1">
              {fieldErrors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          )}

          <button disabled={loading} className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-sm shadow-sm hover:shadow-md">
            {loading ? "Signing up..." : "SIGN UP"}
          </button>

          <div className="mt-4 py-2 border-t">
            <p>
              Already have an account?{" "}
              <Link to="/signin" className=" text-base text-blue-600 cursor-pointer">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
