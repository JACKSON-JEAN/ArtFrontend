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
  const [addNew, setAddNew] = useState(false)
  const [editArtwork, SetEditArtwork] = useState(false)
  const [editId, setEdit] = useState<number>()
  const [addImage, setAddImage] = useState(false)
  const [selectedId, setSelectedId] = useState<number>()
  const { query } = useSearch();
  const { loading, error, data } = useQuery(GET_ARTWORK, {
    variables: {
      searchInput: {
        keyword: query,
      },
    },
  });
  const artwork = data?.getArtwork || [];

  const addHandler = () =>{
    setAddNew(true)
  }

  const artworkEditHandler = (artworkId: number) =>{
    setEdit(artworkId)
    SetEditArtwork(true)
  }

  const editHandler = (editId: number) => {
    setSelectedId(editId);
    setAddImage(true);
  };

  const handleCloseAdd = () =>{
    setAddNew(false)
  }

  if (loading) return <p>Loading</p>;
  if (error)
    return <p>There was an error when fetching data. {error.message}</p>;
  return (
    <div
      className={`${"wrapper "} w-full px-10 sm:px-16 min-h-screen pt-3 bg-slate-50`}
    >
      {addNew && < AddArtwork onClose={handleCloseAdd}/>}
      {editArtwork && <EditArtwork artworkId={Number(editId)} onCloseEdit={() =>SetEditArtwork(false)}/>}
      {addImage && <AddImage editId={Number(selectedId)} onclose={() =>setAddImage(false)}/>}
      <div className=" flex gap-10 mb-4">
        <h1>Artwork</h1>
        <button onClick={addHandler} className=" bg-blue-600 text-white cursor-pointer">Add Artwork</button>
        <Link to="users" className=" text-blue-600">Clients</Link>
      </div>
      <table>
        <tbody>
          {artwork.map((item: Artwork, index: number) => (
            <tr key={item.id} className=" border">
              <td className=" border px-1.5">{index + 1}</td>
              <td><img src={item?.media[0]?.url || img1} 
              alt="" 
              className=" w-12"
              /></td>
              <td className=" border px-1.5">{item.title}</td>
              <td className=" border px-1.5 capitalize">{item.category.toLowerCase()}</td>
              <td className=" border px-1.5">{item.price}</td>
              <td className=" border px-1.5 hover:underline"><p onClick={() =>editHandler(Number(item.id))} className=" text-xs cursor-pointer text-blue-600">Add Image</p></td>
              <td className=" border px-1.5 hover:underline"><p onClick={() =>artworkEditHandler(Number(item.id))} className=" text-xs cursor-pointer text-green-700">Edit</p></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArtworkManagement;
