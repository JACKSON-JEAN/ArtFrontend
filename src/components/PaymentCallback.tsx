import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineErrorOutline } from "react-icons/md";

const PaymentFailed = () => {
    const navigate = useNavigate();
  const ErrorIcon = MdOutlineErrorOutline as React.ComponentType<
      React.SVGProps<SVGSVGElement>
    >;

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const message = params.get("message") || "Oops! Your payment couldn’t be processed.";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-sm shadow-sm max-w-md w-full text-center">
        <div className=" flex justify-center mb-2">
          <p className="text-center text-red-600 text-4xl"><ErrorIcon /></p>
        </div>
        <h2 className="text-xl font-bold mb-2">Payment Failed!</h2>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex justify-center gap-4">
          <button onClick={() => navigate("/")} className="bg-gray-600 text-white px-6 py-2 rounded-sm hover:bg-gray-700 transition">
            Go Back Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed