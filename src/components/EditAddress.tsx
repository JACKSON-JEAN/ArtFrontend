import React, { useEffect, useState } from "react";
import { getUserId } from "../utils/decodeToken";
import { useToast } from "../context/ToastContext";
import { useMutation, useQuery } from "@apollo/client";
import {
  EDIT_ADDRESS_MUTATION,
  GET_ADDRESS_BYID,
  GET_ADDRESSES_BY_CUSTOMER_ID,
} from "../graphql/addresses";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {
  isValidPhoneNumber,
  parsePhoneNumberFromString,
} from "libphonenumber-js";
import { getCountryNameFromCode } from "../utils/countries";

interface AddAddressProps {
  onClose: () => void;
  addressId: number;
}

const EditAddress: React.FC<AddAddressProps> = ({ onClose, addressId }) => {
  const { success, error: toastError } = useToast();
  const userId = getUserId();
  const [userInput, setUserInput] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    zip: "",
    address: "",
  });

  const { loading: loadingAddress, data } = useQuery(GET_ADDRESS_BYID, {
    variables: {
      addressId: addressId,
    },
  });

  const shippingAddress = data?.getAddressById;

  useEffect(() => {
    if (!shippingAddress) return;

    const fullName = shippingAddress.fullName || "";
    const parts = fullName.trim().split(/\s+/);
    const fName = parts.shift() || "";
    const lName = parts.join(" ") || "";

    setUserInput({
      firstName: fName,
      lastName: lName,
      phone: shippingAddress.phone || "",
      country: shippingAddress.country || "",
      state: shippingAddress.state || "",
      city: shippingAddress.city || "",
      zip: shippingAddress.postalCode || "",
      address: shippingAddress.line1 || "",
    });
  }, [shippingAddress]);

  const [updateAddress, { loading }] = useMutation(EDIT_ADDRESS_MUTATION, {
    onCompleted: () => {
      success("Address edited successfully!");
      onClose();
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

  const cleanedInput = Object.fromEntries(
    Object.entries(userInput).map(([key, value]) => [key, value.trim()])
  );

  const { firstName, phone, zip, address, city, state, country } =
    cleanedInput;

    const fullName = [cleanedInput.firstName, cleanedInput.lastName]
  .map((n) => n.trim())
  .filter(Boolean)
  .join(" ");


  const shippingAddresses = {
    fullName: fullName,
    phone: phone.replace(/\s+/g, "") || "",
    country: country || "",
    state: state || "",
    city: city || "",
    postalCode: zip || "",
    line1: address || "",
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address || !city || !country || !firstName || !phone || !state) {
      toastError("Please fill all fields!");
      return;
    }
    if (!isValidPhoneNumber(userInput.phone)) {
      toastError("Please enter a valid phone number!");
      return;
    }
    updateAddress({
      variables: {
        addressId: addressId,
        updateAddressInput: shippingAddresses,
      },
      refetchQueries: [
        {
          query: GET_ADDRESSES_BY_CUSTOMER_ID,
          variables: { customerId: userId },
        },
      ],
    });
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
      <div className="absolute bg-red-300 left-[50%] right-[50%] top-15 sm:top-28 z-20 flex justify-center">
        <form
          onSubmit={submitHandler}
          className="w-96 bg-white rounded-sm shadow-lg relative"
        >
          <div className=" bg-gray-50 px-4 py-2 border-b flex justify-between">
            <p className="text-lg text-red-950 font-semibold">
              Edit shipping address
            </p>
            {loadingAddress && <p>Loading...</p>}
            <p
              onClick={onClose}
              className="text-base text-red-950 hover:text-red-700 font-semibold cursor-pointer"
            >
              X
            </p>
          </div>
          <div className=" px-4 py-4">
            <div className=" flex justify-between mb-2">
              <div className=" w-[49%] flex flex-col">
                <label htmlFor="firstName">First name:</label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="First name..."
                  className="border outline-blue-600 py-1.5 px-2 rounded-sm text-gray-600 capitalize"
                  value={userInput.firstName}
                  onChange={(e) => changeHandler("firstName", e.target.value)}
                />
              </div>
              <div className=" w-[49%] flex flex-col">
                <label htmlFor="lastName">Last name:</label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Last name..."
                  className="border outline-blue-600 py-1.5 px-2 rounded-sm text-gray-600 capitalize"
                  value={userInput.lastName}
                  onChange={(e) => changeHandler("lastName", e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="phone">Phone number:</label>
              <PhoneInput
                international
                defaultCountry="US"
                value={userInput.phone}
                onChange={(value) => {
                  changeHandler("phone", value ?? "");

                  const phoneNumber = parsePhoneNumberFromString(value ?? "");
                  const countryCode = phoneNumber?.country; // US, KE, GB, etc.

                  if (countryCode) {
                    const fullCountryName = getCountryNameFromCode(countryCode);
                    changeHandler("country", fullCountryName);
                  }
                }}
                className="w-full border rounded-sm"
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
              <div className=" w-full flex flex-col ">
                <label htmlFor="state">State/Region/Province:</label>
                <input
                  type="text"
                  id="state"
                  placeholder="State..."
                  className="border outline-blue-600 py-1.5 px-2 rounded-sm text-gray-600"
                  value={userInput.state}
                  onChange={(e) => changeHandler("state", e.target.value)}
                />
              </div>
              
            </div>
            <div className=" flex justify-between mb-2">
              <div className=" w-[49%] flex flex-col">
                <label htmlFor="city">City/Town:</label>
                <input
                  type="text"
                  id="city"
                  placeholder="City..."
                  className="border outline-blue-600 py-1.5 px-2 rounded-sm text-gray-600"
                  value={userInput.city}
                  onChange={(e) => changeHandler("city", e.target.value)}
                />
              </div>
              <div className=" w-[49%] flex flex-col ">
                <label htmlFor="zip">Zip Code:</label>
                <input
                  type="text"
                  id="zip"
                  placeholder="Zip Code..."
                  className="border outline-blue-600 py-1.5 px-2 rounded-sm text-gray-600"
                  value={userInput.zip}
                  onChange={(e) => changeHandler("zip", e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="address">Address:</label>
              
              <textarea
                rows={2}
                name="address"
                id="address"
                placeholder="Street address, apt, suit, unit, building, floor etc"
                className="border outline-blue-600 py-1.5 px-2 rounded-sm text-gray-600 resize-none"
                value={userInput.address}
                onChange={(e) => changeHandler("address", e.target.value)}
              ></textarea>
            </div>
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-base text-white font-semibold px-4 py-1 rounded-sm shadow-sm hover:shadow-md"
            >
              {loading ? "Editing address..." : "Edit address"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAddress;
