import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ADMIN_ORDERS_QUERY } from "../../graphql/orders";
import { ShippingAddress } from "../../pages/Addresses";
import { Link } from "react-router-dom";

interface Artwork {
  id: number;
  title: string;
}

interface OrderItem {
  price: number;
  quantity: number;
  artwork: Artwork;
}

interface Order {
  id: number;
  quantity: number;
  status:
    | "PENDING"
    | "FAILED"
    | "PAID"
    | "PROCESSING"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELLED";
  items: OrderItem[];
  shippingAddress: ShippingAddress;
}

const getStatusBadge = (status: Order["status"]) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-700";
    case "PROCESSING":
      return "bg-amber-100 text-amber-700";
    case "PAID":
      return "bg-green-100 text-green-700";
    case "SHIPPED":
      return "bg-blue-100 text-blue-700";
    case "DELIVERED":
      return "bg-emerald-100 text-emerald-700";
    case "FAILED":
      return "bg-red-100 text-red-700";
    case "CANCELLED":
      return "bg-red-200 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const Orders = () => {
  const searchTerm = "";
  const { loading, error, data } = useQuery(GET_ADMIN_ORDERS_QUERY, {
    variables: {
      searchInput: {
        customerName: searchTerm,
      },
    },
  });

  const orders: Order[] = data?.getAdminOrders || [];

  return (
    <div
      className={` wrapper w-full px-6 sm:px-12 min-h-screen py-6 bg-slate-50`}
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Orders</h1>
        <div className=" flex gap-8">
          <Link
            to="/dashboard"
            className="text-blue-600 font-medium hover:underline"
          >
            Artwork
          </Link>
          <Link
            to="/dashboard/users"
            className="text-blue-600 font-medium hover:underline"
          >
            Users
          </Link>
        </div>
      </div>

      {loading && <p className="text-center mt-6">Loading...</p>}

      {!loading && error && (
        <p className="text-center text-red-600 mt-6">
          There was an error loading orders: {error.message}
        </p>
      )}

      {!loading && !error && orders.length === 0 && (
        <p className="text-center mt-6">No orders found.</p>
      )}

      <div
        className={`${"order"} grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4`}
      >
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-sm shadow-sm p-4 border hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-lg text-gray-800">
                Order #{order.id}
              </h2>
              <span
                className={`text-sm font-medium px-2 py-1 rounded ${getStatusBadge(
                  order.status,
                )}`}
              >
                {order.status}
              </span>
            </div>

            <div className="border-t pt-2 space-y-3">
              <h3 className="font-semibold text-gray-700 mb-1">Items</h3>
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="bg-slate-50 rounded-sm p-2 text-sm border"
                >
                  <p>
                    💰 <strong>Price:</strong> ${item.price}
                  </p>
                  <p>
                    📦 <strong>Quantity:</strong> {item.quantity}
                  </p>
                  <p>
                    🖼️ <strong>Artwork:</strong>{" "}
                    {item.artwork
                      ? `${item.artwork.title} (ID: ${item.artwork.id})`
                      : "No artwork"}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t mt-3 pt-3">
              <h3 className="font-semibold text-gray-700 mb-1">
                Shipping Address
              </h3>
              {order.shippingAddress ? (
                <div className="text-sm space-y-1">
                  <p>
                    👤 <strong>Name:</strong> {order.shippingAddress.fullName}
                  </p>
                  <p>
                    📞 <strong>Phone:</strong> {order.shippingAddress.phone}
                  </p>
                  {order.shippingAddress.email && (
                    <p>
                      ✉️ <strong>Email:</strong> {order.shippingAddress.email}
                    </p>
                  )}
                  <p>
                    🏠 <strong>Address:</strong> {order.shippingAddress.line1}
                  </p>
                  {order.shippingAddress.postalCode && (
                    <p>
                      📨 <strong>ZIP:</strong>{" "}
                      {order.shippingAddress.postalCode}
                    </p>
                  )}
                  <p>
                    🌆 <strong>City:</strong> {order.shippingAddress.city}
                  </p>
                  {order.shippingAddress.state && (
                    <p>
                      🏙️ <strong>State:</strong> {order.shippingAddress.state}
                    </p>
                  )}
                  <p>
                    🌍 <strong>Country:</strong> {order.shippingAddress.country}
                  </p>
                </div>
              ) : (
                <em>No shipping address</em>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
