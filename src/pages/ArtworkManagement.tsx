import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { GET_ARTWORK } from "../graphql/artwork";
import { useSearch } from "../context/search.context";
import { Artwork } from "../types/artwork";
import img1 from "../images/art1.jpg";
import AddArtwork from "../components/AddProduct";
import { Link } from "react-router-dom";
import AddImage from "../dashboard/components/AddImage";
import EditArtwork from "../components/EditArtwork";

type ProductsProps = {
  limit?: number;
  subTitle?: string;
  categoryFilter?: string;
  onFilter?: (category: string) => void;
};

const ArtworkManagement: React.FC<ProductsProps> = () => {
  const [addNew, setAddNew] = useState(false);
  const [editArtwork, setEditArtwork] = useState(false);
  const [editId, setEditId] = useState<number>();
  const [addImage, setAddImage] = useState(false);
  const [selectedId, setSelectedId] = useState<number>();

  const { query } = useSearch();
  const { loading, error, data } = useQuery(GET_ARTWORK, {
    variables: { searchInput: { keyword: query } },
  });

  const artworks: Artwork[] = data?.getArtwork || [];

  // Handlers
  const handleAddNew = () => setAddNew(true);
  const handleCloseAdd = () => setAddNew(false);
  const handleEditArtwork = (id: number) => {
    setEditId(id);
    setEditArtwork(true);
  };
  const handleAddImage = (id: number) => {
    setSelectedId(id);
    setAddImage(true);
  };

  if (loading) return <p>Loading...</p>;
  if (error)
    return <p>There was an error fetching data: {error.message}</p>;

  return (
    <div className="wrapper w-full px-10 sm:px-16 min-h-screen pt-3 bg-slate-50">
      {/* Modals */}
      {addNew && <AddArtwork onClose={handleCloseAdd} />}
      {editArtwork && (
        <EditArtwork
          artworkId={Number(editId)}
          onCloseEdit={() => setEditArtwork(false)}
        />
      )}
      {addImage && (
        <AddImage
          editId={Number(selectedId)}
          onclose={() => setAddImage(false)}
        />
      )}

      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-gray-800">🎨 Artwork Management</h1>
        <div className="flex gap-4">
          
          <Link
            to="orders"
            className="text-blue-600 font-medium hover:underline"
          >
            Orders
          </Link>
          <Link
            to="users"
            className="text-blue-600 font-medium hover:underline"
          >
            Clients
          </Link>
          <button
            onClick={handleAddNew}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
          >
            + Add Artwork
          </button>
        </div>
      </div>

      {/* Table Section */}
      {artworks.length === 0 ? (
        <p>No artworks found.</p>
      ) : (
        <table className="border-collapse border w-full text-left">
          <thead className="bg-slate-100">
            <tr>
              <th className="border px-2 py-1">#</th>
              <th className="border px-2 py-1">Preview</th>
              <th className="border px-2 py-1">Title</th>
              <th className="border px-2 py-1">Category</th>
              <th className="border px-2 py-1">Price ($)</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {artworks.map((item, index) => (
              <tr key={item.id} className="border hover:bg-slate-50">
                <td className="border px-2 py-1">{index + 1}</td>
                <td className="border px-2 py-1">
                  <img
                    src={item?.media[0]?.url || img1}
                    alt={item.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="border px-2 py-1">{item.title}</td>
                <td className="border px-2 py-1 capitalize">{item.category.toLowerCase()}</td>
                <td className="border px-2 py-1">${item.price.toFixed(2)}</td>
                <td className="border px-2 py-1 text-sm space-x-3">
                  <button
                    onClick={() => handleAddImage(item.id)}
                    className="text-blue-600 hover:underline"
                  >
                    Add Image
                  </button>
                  <button
                    onClick={() => handleEditArtwork(item.id)}
                    className="text-green-700 hover:underline"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ArtworkManagement;
