import { useMutation } from "@apollo/client";
import React, { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { FORGOT_PASSWORD_MUTATION } from "../graphql/users";

const ForgotPassword = () => {
  const [fieldErrors, setFieldErrors] = useState<string[]>([]);
  const [generalError, setGeneralError] = useState<string>("");

  const [userInput, setUserInput] = useState({
    email: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const [forgotPassword, { loading }] = useMutation(FORGOT_PASSWORD_MUTATION, {
    onCompleted: () => {
      setSubmitted(true);
      
    },
    onError: (error) => {
      setSubmitted(true)
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
        setGeneralError(error.message || "Email failed");
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

    setGeneralError("");
    setFieldErrors([]);

    if (!userInput.email.trim()) {
      setGeneralError("Email is required.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(userInput.email)) {
      setGeneralError("Invalid email address");
      return;
    }

    await forgotPassword({
      variables: {
        email: userInput.email,
      },
    });
  };

  return (
    <div className=" w-full flex justify-center px-10 sm:px-20 min-h-screen py-4 bg-slate-50">
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
          className={` ${"auth"} bg-white w-[350px] pb-6 pt-3 px-3 border rounded-sm`}
        >
          <p className=" text-xl text-red-950 font-semibold mb-3">
            Forgot Password
          </p>
          <div className=" flex-1 flex flex-col mb-3">
            <label htmlFor="email">Enter your email address</label>
            <input
              id="email"
              className=" border outline-blue-500 rounded-sm pl-2 py-1.5"
              type="email"
              placeholder="Enter email address"
              disabled={submitted || loading}
              value={userInput.email}
              onChange={(e) => changeHandler("email", e.target.value)}
            />
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

          {submitted && (
            <p className="text-green-700 bg-green-100 p-2 mb-2 rounded-sm text-xs">
              If an account exists with this email, a reset link has been sent.
            </p>
          )}

          <button
            disabled={loading || submitted}
            className=" w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-sm shadow-sm hover:shadow-md"
          >
            {loading ? "Submitting..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
