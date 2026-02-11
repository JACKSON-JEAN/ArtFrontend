import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorised = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold text-red-600">403</h1>

      <h2 className="mt-4 text-xl font-semibold text-gray-700">
        Access denied
      </h2>

      <p className="mt-2 text-gray-500 max-w-md">
        This section isn’t available for your account.
      </p>

      <div className="mt-6 flex gap-4">
        <button
          onClick={() =>
            window.history.length > 1 ? navigate(-1) : navigate("/")
          }
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Unauthorised;
