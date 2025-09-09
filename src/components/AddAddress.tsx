import React, { useEffect, useState } from "react";
import { getUserId, getUsername } from "../utils/decodeToken";
import { useToast } from "../context/ToastContext";
import { useMutation } from "@apollo/client";
import {
  ADD_ADDRESS_MUTATION,
  GET_ADDRESSES_BY_CUSTOMER_ID,
} from "../graphql/addresses";

interface AddAddressProps {
  onClose: () => void;
}

const AddAddress: React.FC<AddAddressProps> = ({ onClose }) => {
  const { success, error: toastError } = useToast();
  const userId = getUserId();
  const [userInput, setUserInput] = useState({
    fullName: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    address: "",
  });

  useEffect(() => {
    const clientName = getUsername();
    if (clientName) {
      setUserInput((prev) => ({
        ...prev,
        fullName: clientName,
      }));
    }
  }, []);

  const [addAddress, { loading }] = useMutation(ADD_ADDRESS_MUTATION, {
    onCompleted: () => {
      success("Address added successfully!");
    },
    onError: (error) => {
      toastError(error.message);
    },
  });

  const changeHandler = (identifier: string, value: string) => {
    setUserInput((prev) => ({
      ...prev,
      [identifier]: value,
    }));
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !userInput.address.trim() ||
      !userInput.city.trim() ||
      !userInput.country.trim() ||
      !userInput.fullName.trim() ||
      !userInput.phone.trim() ||
      !userInput.state.trim()
    ) {
      toastError("Please fill all fields!");
      return;
    }
    addAddress({
      variables: {
        addAddressInput: {
          customerId: userId,
          fullName: userInput.fullName,
          phone: userInput.phone,
          line1: userInput.address,
          city: userInput.city,
          country: userInput.country,
          state: userInput.state,
        },
      },
      refetchQueries: [
        {
          query: GET_ADDRESSES_BY_CUSTOMER_ID,
          variables: { customerId: userId },
        },
      ],
    });
    onClose()
  };

  if (!userId) {
    return (
      <div className="wrapper w-full px-10 sm:px-16 min-h-screen pt-3 bg-slate-50">
        <p className="text-red-600">No user found. Please log in first.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div
        onClick={onClose}
        className="fixed left-0 top-0 w-full h-screen bg-black bg-opacity-10 z-10 ease-in-out duration-700"
      ></div>
      <div className="absolute bg-red-300 left-[50%] right-[50%] top-20 sm:top-28 z-20 flex justify-center">
        <form
          onSubmit={submitHandler}
          className="w-96 bg-white rounded-sm shadow-lg relative"
        >
          <div className=" bg-gray-50 px-4 py-2 border-b flex justify-between">
            <p className="text-lg text-red-950 font-semibold">
              Add shipping address
            </p>
            <p
              onClick={onClose}
              className="text-base text-red-950 hover:text-red-700 font-semibold cursor-pointer"
            >
              X
            </p>
          </div>
          <div className=" px-4 py-4">
            <div className="flex flex-col mb-2">
              <label htmlFor="name">Full name:</label>
              <input
                type="text"
                id="name"
                placeholder="Full name..."
                className="border outline-blue-600 py-1.5 px-2 rounded-sm text-gray-600 capitalize"
                value={userInput.fullName}
                onChange={(e) => changeHandler("fullName", e.target.value)}
              />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="phone">Phone number:</label>
              <input
                type="text"
                id="phone"
                placeholder="Phone..."
                className="border outline-blue-600 py-1.5 px-2 rounded-sm text-gray-600"
                value={userInput.phone}
                onChange={(e) => changeHandler("phone", e.target.value)}
              />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="country">Country:</label>
              <input
                type="text"
                id="country"
                placeholder="Country..."
                className="border outline-blue-600 py-1.5 px-2 rounded-sm text-gray-600"
                value={userInput.country}
                onChange={(e) => changeHandler("country", e.target.value)}
              />
            </div>
            <div className=" flex justify-between mb-2">
              <div className=" w-[49%] flex flex-col ">
                <label htmlFor="name">State/Region/Province:</label>
                <input
                  type="text"
                  id="state"
                  placeholder="State..."
                  className="border outline-blue-600 py-1.5 px-2 rounded-sm text-gray-600"
                  value={userInput.state}
                  onChange={(e) => changeHandler("state", e.target.value)}
                />
              </div>
              <div className=" w-[49%] flex flex-col">
                <label htmlFor="name">City:</label>
                <input
                  type="text"
                  id="city"
                  placeholder="City..."
                  className="border outline-blue-600 py-1.5 px-2 rounded-sm text-gray-600"
                  value={userInput.city}
                  onChange={(e) => changeHandler("city", e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="name">Address:</label>
              <input
                type="text"
                id="address"
                placeholder="Street address, apt, suit, unit, building, floor etc"
                className="border outline-blue-600 py-1.5 px-2 rounded-sm text-gray-600"
                value={userInput.address}
                onChange={(e) => changeHandler("address", e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-base text-white font-semibold px-4 py-1 rounded-sm shadow-sm hover:shadow-md"
            >
              {loading ? "Adding address..." : "Use this address"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAddress;
