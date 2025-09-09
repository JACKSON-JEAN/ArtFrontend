import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { GET_ADDRESSES_BY_CUSTOMER_ID } from "../graphql/addresses";
import { getUserId } from "../utils/decodeToken";
import { useCart } from "../context/cart.context";
import { formatDate } from "../utils/DateFormat";
import AddAddress from "../components/AddAddress";
import Signin from "./Signin";
import EditAddress from "../components/EditAddress";

interface Address {
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
  const userId = getUserId();
  const { cart, total } = useCart();
  const[addAddresses, setAddAddresses] = useState(false)
  const[editAddresses, setEditAddresses] = useState(false)
  const [selectedId, setSelectedId] = useState<number>()
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // If no userId, don't even run the query
  const skipQuery = !userId;

  const { loading, error, data } = useQuery(GET_ADDRESSES_BY_CUSTOMER_ID, {
    variables: { customerId: userId },
    skip: skipQuery, // Apollo will skip query execution
  });

  const addresses = data?.getAddressesByCustomerId || [];

  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() + 3);

  const endDate = new Date(today);
  endDate.setDate(today.getDate() + 8);


  if (!userId) {
    return (
      <Signin/>
    );
  }

  const editHandler = (clientId: number) => {
    setSelectedId(clientId);
    setEditAddresses(true);
  };

  return (
    <div className="wrapper w-full px-10 sm:px-16 min-h-screen pt-3 bg-slate-50">
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      
      {addAddresses && <AddAddress onClose={() =>setAddAddresses(false)}/>}
        {editAddresses && <EditAddress addressId={Number(selectedId)} onClose={()=>setEditAddresses(false)}/>}

      <div className=" w-full flex md:flex-row flex-col gap-3">
        <div className="border shadow-sm rounded-sm lg:w-[calc(100%-300px)] w-full">
          <section className=" py-1.5 px-3 border-b">
            <p className="text-lg text-red-950 font-semibold">
              Delivery Address
            </p>
          </section>

          {addresses.length === 0 && (
            <section className="flex items-end justify-between py-1.5 px-3">
              <p>No address Found!</p>
            </section>
          )}

          {addresses && (
            <section className="py-1.5 px-3">
              {addresses.map((item: Address) => (
                <div key={item.id} className=" mb-2.5 flex items-start gap-2">
                  <input
                    type="radio"
                    name="address-choice"
                    className=" mt-7 cursor-pointer"
                  />
                  <div>
                    <p className=" text-base capitalize font-medium">
                      {item.fullName}
                    </p>
                    <p className=" text-gray-600 text-sm mb-1">
                      {item.line1} | {item.city}{" "}
                      {item?.state && `| ${item.state}`} | {item.country}{" "}
                      {item?.email && `| ${item.email}`} | {item.phone}
                    </p>
                    <p onClick={() =>editHandler(item.id)} className=" py-1 text-blue-600 hover:text-blue-700 text-sm cursor-pointer">
                      Edit ddress
                    </p>
                  </div>
                </div>
              ))}

              <p onClick={()=> setAddAddresses(true)} className=" py-1 text-blue-600 hover:text-blue-700 text-sm cursor-pointer">
                Add a new delivery address
              </p>

              <div className=" border-t mt-2">
                <p className="text-base text-red-950 font-medium">
                  Delivery Details
                </p>
                <p className=" text-gray-600 text-sm">To be delivered between <span className=" text-black">{formatDate(startDate)}</span> and <span className=" text-black">{formatDate(endDate)}</span></p>
              </div>
            </section>
          )}
        </div>
        <section className=" w-full lg:w-[300px] order-1 md:order-2 sm:sticky lg:top-0 lg:left-0">
          <div className=" bg-white rounded-sm border px-3 py-2">
            <p className=" mb-1">
              {`Order summary(${totalItems} items):`}{" "}
              <span className=" font-semibold">${total.toFixed(2)}</span>
            </p>
            <div className=" border-t">
              <button className=" bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow-md text-white py-0.5 rounded-sm w-full mt-2">
                Confirm order
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Addresses;
