import { useQuery } from "@apollo/client";
import { GET_USERS } from "../../graphql/users";
import EditUser from "../../dashboard/components/EditUser";
import { useState } from "react";
import { Link } from "react-router-dom";

interface Client {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  role: "CUSTOMER" | "ADMIN";
  isActive: boolean;
}

const Users = () => {
  const [editClient, setEditClient] = useState(false);
  const [selectedId, setSelectedId] = useState<number>();

  const { loading, error, data } = useQuery(GET_USERS, {
    variables: { searchInput: { keyword: "" } },
  });

  const clients: Client[] = data?.getUsers || [];

  const handleEdit = (id: number) => {
    setSelectedId(id);
    setEditClient(true);
  };

  if (error)
    return (
      <p className="text-center text-red-600 mt-6">
        Error fetching users: {error.message}
      </p>
    );

  return (
    <div className="wrapper w-full px-10 sm:px-16 min-h-screen pt-3 bg-gray-100">
      {/* Edit Modal */}
      {editClient && (
        <EditUser
          userId={Number(selectedId)}
          onClose={() => setEditClient(false)}
        />
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Clients</h1>
        <div className=" flex gap-8">
          <Link
            to="/dashboard/orders"
            className="text-blue-600 font-medium hover:underline"
          >
            Orders
          </Link>
          <Link
            to="/dashboard"
            className="text-blue-600 font-medium hover:underline"
          >
            Artwork
          </Link>
        </div>
      </div>

      {/* Loading */}
      {loading && <p>Loading...</p>}

      {/* No clients */}
      {!loading && clients.length === 0 && <p>No clients found.</p>}

      {/* Clients Table */}
      {clients.length > 0 && (
        <div className=" w-full overflow-x-auto bg-white p-2 rounded-sm">
          <table className="border-collapse border w-full text-left">
            <thead className="bg-slate-100">
              <tr>
                <th className="border px-2 py-1">#</th>
                <th className="border px-2 py-1">Full Name</th>
                <th className="border px-2 py-1">Email</th>
                <th className="border px-2 py-1">Phone</th>
                <th className="border px-2 py-1">Role</th>
                <th className="border px-2 py-1">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client, index) => (
                <tr
                  key={client.id}
                  className="even:bg-gray-50 text-sm text-gray-800 hover:bg-gray-100"
                >
                  <td className="border px-2 py-1">{index + 1}</td>
                  <td className="border px-2 py-1">{client.fullName}</td>
                  <td className="border px-2 py-1">{client.email}</td>
                  <td className="border px-2 py-1">{client.phone}</td>
                  <td className="border px-2 py-1 capitalize">
                    {client.role.toLowerCase()}
                  </td>
                  <td className="border px-2 py-1">
                    <button
                      onClick={() => handleEdit(client.id)}
                      className="text-green-600 text-xs hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Users;
