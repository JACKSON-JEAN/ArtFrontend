import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentCancelled = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-[1/4]">
      <div className="max-w-md w-full bg-white rounded-md shadow-sm border p-6 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="h-14 w-14 rounded-full bg-yellow-100 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-yellow-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          Payment Cancelled
        </h1>

        {/* Message */}
        <p className="text-gray-600 text-sm mb-4">
          Your payment was cancelled and <span className="font-medium">no charges were made</span>.
          You can safely try again whenever you’re ready.
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => navigate("/collection")}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-sm font-medium transition"
          >
            Return to Shopping
          </button>

          <button
            onClick={() => navigate("/")}
            className="border border-gray-300 hover:bg-gray-100 text-gray-700 py-2 rounded-sm font-medium transition"
          >
            Back Home
          </button>
        </div>

        {/* Support hint */}
        <p className="text-xs text-gray-500 mt-4">
          Need help? Please contact support if the issue persists.
        </p>
      </div>
    </div>
  );
};

export default PaymentCancelled;
