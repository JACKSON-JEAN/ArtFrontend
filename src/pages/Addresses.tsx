import { useQuery, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

import { GET_ADDRESSES_BY_CUSTOMER_ID } from "../graphql/addresses";
import { CREATE_ORDER } from "../graphql/payments";
import { CREATE_STRIPE_CHECKOUT_SESSION } from "../graphql/payments";
import { GET_ARTWORK } from "../graphql/artwork";
import { GET_CLIENT_CART } from "../graphql/cart";

import { useCart } from "../context/cart.context";
import { getUserId } from "../utils/decodeToken";
import { formatDate } from "../utils/DateFormat";

import AddAddress from "../components/AddAddress";
import EditAddress from "../components/EditAddress";

export interface ShippingAddress {
  id: number;
  line1: string;
  city: string;
  state?: string;
  country: string;
  fullName: string;
  phone: string;
  email: string;
}

const Addresses = () => {
  const { cart, total } = useCart();
  const [addAddresses, setAddAddresses] = useState(false);
  const [editAddresses, setEditAddresses] = useState(false);
  const [selectedId, setSelectedId] = useState<number>();
  const [selectedAddressId, setSelectedAddressId] = useState<number>();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const userId = getUserId();

  const navigate = useNavigate();

  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() + 3);
  const endDate = new Date(today);
  endDate.setDate(today.getDate() + 8);

  

  // Queries and Mutations
  const { loading, error, data } = useQuery(GET_ADDRESSES_BY_CUSTOMER_ID, {
    variables: { customerId: userId },
    skip: !userId,
  });

  const [createOrder] = useMutation(CREATE_ORDER);
  const [createStripeCheckoutSession] = useMutation(CREATE_STRIPE_CHECKOUT_SESSION);

  const addresses = data?.getAddressesByCustomerId || [];

  // Stripe public key
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY!);

  const handleConfirmOrder = async () => {
    if (!selectedAddressId) {
      setPaymentError("Please select a delivery address");
      return;
    }
    if (cart.length === 0) {
      setPaymentError("Your cart is empty");
      return;
    }
    if (!userId) {
      setPaymentError("Please log in to complete your order");
      return;
    }

    setIsProcessing(true);
    setPaymentError("");

    try {
      // 1️⃣ Create the order first
      const orderResult = await createOrder({
        variables: {
          customerId: parseFloat(userId),
          addOrderInput: {
            shippingAddressId: selectedAddressId,
            totalAmount: total,
            status: "PENDING",
          },
        },
        refetchQueries: [
          { query: GET_ARTWORK },
          { query: GET_CLIENT_CART, variables: { clientId: userId } },
        ],
      });

      const orderId = orderResult.data.addOrder.id;

      // 2️⃣ Create Stripe Checkout session
      const { data } = await createStripeCheckoutSession({
        variables: { orderId },
      });

      const { sessionUrl } = data.createStripeCheckoutSession;

      if (!sessionUrl) throw new Error("Stripe session URL not returned");

      // 3️⃣ Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe failed to load");

      window.location.href = sessionUrl; // simpler redirect method
    } catch (err: any) {
      console.error("Order creation or Stripe checkout failed:", err);
      const errorMessage =
        err.networkError?.result?.errors?.[0]?.message ||
        err.graphQLErrors?.[0]?.message ||
        err.message ||
        "Something went wrong. Please try again.";
      setPaymentError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddressSelect = (addressId: number) => {
    setSelectedAddressId(addressId);
    setPaymentError("");
  };

  useEffect(() => {
    if (!userId) navigate("/signin");
  }, [userId, navigate]);

  const editHandler = (clientId: number) => {
    setSelectedId(clientId);
    setEditAddresses(true);
  };

  return (
    <div className="wrapper w-full px-10 sm:px-16 min-h-screen pt-3">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error.message}</p>}

      {addAddresses && <AddAddress onClose={() => setAddAddresses(false)} />}
      {editAddresses && (
        <EditAddress
          addressId={Number(selectedId)}
          onClose={() => setEditAddresses(false)}
        />
      )}

      <div className="w-full flex md:flex-row flex-col gap-3">
        {/* Delivery Addresses */}
        <div className="border shadow-sm rounded-sm lg:w-[calc(100%-300px)] w-full">
          <section className="py-1.5 px-3 border-b">
            <p className="text-lg text-red-950 font-semibold">Delivery Address</p>
          </section>

          {addresses.length === 0 && (
            <section className="flex items-end justify-between py-1.5 px-3">
              <p>
                No address found! Please{" "}
                <span
                  onClick={() => setAddAddresses(true)}
                  className="py-1 text-blue-600 hover:text-blue-700 text-sm cursor-pointer"
                >
                  add a delivery address.
                </span>
              </p>
            </section>
          )}

          {addresses.length > 0 && (
            <section className="py-1.5 px-3">
              {addresses.map((item: ShippingAddress) => (
                <div key={item.id} className="mb-2.5 flex items-start gap-2">
                  <input
                    type="radio"
                    name="address-choice"
                    className="mt-7 cursor-pointer"
                    checked={selectedAddressId === item.id}
                    onChange={() => handleAddressSelect(item.id)}
                  />
                  <div className="flex-1">
                    <p className="text-base capitalize font-medium">{item.fullName}</p>
                    <p className="text-gray-600 text-sm mb-1">
                      {item.line1} | {item.city} {item?.state && `| ${item.state}`} | {item.country}{" "}
                      {item?.email && `| ${item.email}`} | {item.phone}
                    </p>
                    <p
                      onClick={() => editHandler(item.id)}
                      className="py-1 text-blue-600 hover:text-blue-700 text-sm cursor-pointer"
                    >
                      Edit address
                    </p>
                  </div>
                </div>
              ))}
              <p
                onClick={() => setAddAddresses(true)}
                className="py-1 text-blue-600 hover:text-blue-700 text-sm cursor-pointer"
              >
                Add a new delivery address
              </p>

              <div className="border-t mt-2 pt-2">
                <p className="text-base text-red-950 font-medium">Delivery Details</p>
                <p className="text-gray-600 text-sm">
                  To be delivered between{" "}
                  <span className="text-black">{formatDate(startDate)}</span> and{" "}
                  <span className="text-black">{formatDate(endDate)}</span>
                </p>
              </div>
            </section>
          )}
        </div>

        {/* Order Summary */}
        <section className="w-full lg:w-[300px] order-1 md:order-2 sm:sticky lg:top-0 lg:left-0">
          <div className="bg-white rounded-sm border px-3 py-2 shadow-sm">
            <p className="mb-1">
              {`Order summary (${totalItems} ${totalItems === 1 ? "item" : "items"}):`}{" "}
              <span className="font-semibold">${total.toFixed(2)}</span>
            </p>

            {paymentError && (
              <div className="text-red-600 text-sm mb-2 p-2 bg-red-50 rounded">{paymentError}</div>
            )}

            <div className="border-t pt-2">
              <button
                onClick={handleConfirmOrder}
                disabled={isProcessing || !selectedAddressId || addresses.length === 0}
                className={`${
                  isProcessing || !selectedAddressId || addresses.length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 hover:shadow-md"
                } shadow-sm text-amber-50 py-1 rounded-sm w-full mt-2 transition-all font-semibold`}
              >
                {isProcessing ? "Processing..." : "Confirm order"}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Addresses;
