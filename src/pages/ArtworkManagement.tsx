// Infinite scroll
import { useMutation, useQuery } from "@apollo/client";
import React, { useCallback, useEffect, useState } from "react";
import { GET_ADMIN_ARTWORK, DELETE_ARTWORK_MUTATION } from "../graphql/artwork";
import { useSearch } from "../context/search.context";
import { Artwork } from "../types/artwork";
import img1 from "../images/art1.jpg";
import AddArtwork from "../components/AddProduct";
import { Link } from "react-router-dom";
import AddImage from "../dashboard/components/AddImage";
import EditArtwork from "../components/EditArtwork";
import DeleteArtwork from "../components/DeleteArtwork";
import { useToast } from "../context/ToastContext";

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
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState<string>("");

  // 🔹 Infinite scroll state
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const [fetchingMore, setFetchingMore] = useState(false);

  const { query } = useSearch();
  const { success, error: toastError } = useToast();
  const { loading, error, data, fetchMore } = useQuery(GET_ADMIN_ARTWORK, {
    variables: { searchInput: { keyword: query, limit: 12 } },
    notifyOnNetworkStatusChange: true,
  });

  const [deleteArtwork] = useMutation(DELETE_ARTWORK_MUTATION, {
    onCompleted: async (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  useEffect(() => {
    if (data?.getAdminArtwork && artworks.length === 0) {
      setArtworks(data.getAdminArtwork.artworks);
      setNextCursor(data.getAdminArtwork.nextCursor ?? null);
    }
  }, [data, artworks.length]);

  // 🔹 Load more
  const loadMore = useCallback(async () => {
    if (!nextCursor || fetchingMore) return;

    setFetchingMore(true);
    try {
      const { data: moreData } = await fetchMore({
        variables: {
          searchInput: {
            keyword: query,
            limit: 12,
            cursor: nextCursor,
          },
        },
      });

      setArtworks((prev) => [...prev, ...moreData.getAdminArtwork.artworks]);
      setNextCursor(moreData.getAdminArtwork.nextCursor ?? null);
    } finally {
      setFetchingMore(false);
    }
  }, [nextCursor, fetchingMore, fetchMore, query]);

  // 🔹 Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.5 },
    );

    const sentinel = document.querySelector("#scroll-sentinel");
    if (sentinel) observer.observe(sentinel);

    return () => observer.disconnect();
  }, [loadMore]);

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
  //just one step
  const initialLoading = loading && artworks.length === 0;
  if (error) return <p>There was an error fetching data: {error.message}</p>;

  const handleDeleteClick = (id: number, title: string) => {
    setSelectedId(id);
    setSelectedTitle(title);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedId === undefined) return;

    // Remove from local state (important for infinite scroll)
    try {
      await deleteArtwork({
        variables: { artworkId: Number(selectedId) },
      });

      setArtworks((prev: Artwork[]) => prev.filter((a) => a.id !== selectedId));

      success("Item deleted successfully!");
    } catch (error: any) {
      toastError(error.message);
    }

    setDeleteOpen(false);
    setSelectedId(undefined);
    setSelectedTitle("");
  };

  return (
    <div className=" bg-gray-100 wrapper w-full px-10 sm:px-16 min-h-screen pt-3">
      {deleteOpen && selectedId !== undefined && (
        <DeleteArtwork
          selectedId={selectedId}
          artworkTitle={selectedTitle}
          onDelete={handleConfirmDelete}
          onCancel={() => {
            setDeleteOpen(false);
            setSelectedId(undefined);
            setSelectedTitle("");
          }}
        />
      )}

      {initialLoading && <p>Loading...</p>}
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
        <h1 className="text-xl font-semibold text-gray-800">Artwork</h1>
        <div className="flex items-center gap-4">
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
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition flex items-center gap-1"
          >
            <span className=" text-xl">+</span>{" "}
            <span className=" hidden sm:block">Add Artwork</span>
          </button>
        </div>
      </div>

      {/* Table Section */}
      {artworks.length === 0 ? (
        <p>No artworks found.</p>
      ) : (
        <div className=" w-full overflow-x-auto bg-white p-2 rounded-sm">
          <table className="border-collapse border min-w-[900px] w-full text-left">
            <thead className="bg-slate-100">
              <tr>
                <th className="border px-2 py-1">#</th>
                <th className="border px-2 py-1">Preview</th>
                <th className="border px-2 py-1 whitespace-nowrap">Title</th>
                <th className="border px-2 py-1 whitespace-nowrap">Category</th>
                <th className="border px-2 py-1 whitespace-nowrap">
                  Price ($)
                </th>
                <th className="border px-2 py-1 whitespace-nowrap">Actions</th>
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
                  <td className="border px-2 py-1 whitespace-nowrap">
                    {item.title}
                  </td>
                  <td className="border px-2 py-1 capitalize whitespace-nowrap">
                    {item.material
                      ? item.material
                      : item.category.toLowerCase()}
                  </td>
                  <td className="border px-2 py-1 whitespace-nowrap">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className=" border px-2 py-1 text-sm space-x-3 whitespace-nowrap">
                    <div className=" flex gap-4">
                      <button
                        onClick={() => handleAddImage(item.id)}
                        className="text-blue-600 hover:underline hidden sm:block"
                      >
                        Add Image
                      </button>
                      <button
                        onClick={() => handleEditArtwork(item.id)}
                        className="text-green-700 hover:underline hidden sm:block"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(item.id, item.title)}
                        className="text-red-700 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {fetchingMore && (
        <p className="text-center py-4 text-gray-500">Loading more artworks…</p>
      )}

      {nextCursor && <div id="scroll-sentinel" className="h-10" />}
    </div>
  );
};

export default ArtworkManagement;
