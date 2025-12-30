import { useMutation } from "@apollo/client";
import React, { FormEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RESET_PASSWORD_MUTATION } from "../graphql/users";
import { useToast } from "../context/ToastContext";

const ResetPassword = () => {
  const [fieldErrors, setFieldErrors] = useState<string[]>([]);
  const [generalError, setGeneralError] = useState<string>("");

  const [userInput, setUserInput] = useState({
    new_password: "",
    confirm_password: "",
  });

  const { success } = useToast();

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const resetToken = searchParams.get("token");

  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD_MUTATION, {
    onCompleted: () => {
      navigate("/signin");
      success("Password reset successfully!");
    },
    onError: (error) => {
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
        setGeneralError(error.message || "Reset failed");
      }
    },
  });

  const changeHandler = (identifier: string, value: string) => {
    setUserInput((prev) => ({
      ...prev,
      [identifier]: value,
    }));
  };

  const passwordRegex =
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    setGeneralError("");
    setFieldErrors([]);

    if (!resetToken) {
      setGeneralError("Invalid or expired reset link");
      return;
    }

    if (!userInput.new_password.trim() || !userInput.confirm_password.trim()) {
      setGeneralError("Please fill both fields");
      return;
    }
    if (userInput.new_password.length < 8) {
      setGeneralError("Password must be at least 8 characters long");
      return;
    }
    if (!passwordRegex.test(userInput.new_password)) {
      setGeneralError(
        "Password is too weak. Must have uppercase, lowercase, and a number or special character."
      );
      return;
    }

    if (userInput.new_password !== userInput.confirm_password) {
      setGeneralError("Your passwords do not match.");
      return;
    }

    await resetPassword({
      variables: {
        resetPasswordInput: {
          token: resetToken,
          newPassword: userInput.new_password,
        },
      },
    });
  };

  return (
    <div className=" w-full flex justify-center px-10 sm:px-20 min-h-screen py-4 bg-slate-50">
      <div className=" flex items-center flex-col">
        <p className=" w-[400px] text-center mb-6">
          <Link
            to="/"
            className=" text-2xl text-red-950 font-semibold font-logo whitespace-nowrap"
          >
            Pearl Art Galleries
          </Link>
        </p>
        <form
          onSubmit={submitHandler}
          className={` ${"auth"} bg-white w-[300px] pb-6 pt-3 px-3 border rounded-sm`}
        >
          <p className=" text-lg text-red-950 font-semibold mb-3">
            New Password
          </p>
          <div className=" flex-1 flex flex-col mb-3">
            <label htmlFor="new_password">Create new password</label>
            <input
              id="new_password"
              className=" border outline-blue-500 rounded-sm pl-2 py-1"
              type="password"
              placeholder="New password"
              value={userInput.new_password}
              onChange={(e) => changeHandler("new_password", e.target.value)}
            />
          </div>
          <div className=" flex-1 flex flex-col mb-3">
            <label htmlFor="confirm_password">Confirm your password</label>
            <input
              id="confirm_password"
              className=" border outline-blue-500 rounded-sm pl-2 py-1"
              type="password"
              placeholder="Confirm password"
              value={userInput.confirm_password}
              onChange={(e) =>
                changeHandler("confirm_password", e.target.value)
              }
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

          <button disabled={loading} className=" w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-sm shadow-sm hover:shadow-md">
            {loading ? "Resetting..." : "Reset"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
