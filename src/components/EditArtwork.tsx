import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  EDIT_ARTWORK_MUTATION,
  GET_ARTWORK,
  GET_ARTWORK_BYID,
} from "../graphql/artwork";

interface EditArtworkProps {
  artworkId: number;
  onCloseEdit: () => void;
}

const EditArtwork: React.FC<EditArtworkProps> = ({
  artworkId,
  onCloseEdit,
}) => {
  const [generalError, setGeneralError] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<string[]>([]);
  const [updateArtwork, { loading }] = useMutation(EDIT_ARTWORK_MUTATION, {
    onError: (error) => {
      // 🔹 Extract validation errors from GraphQL if available
      const validationErrors = Array.isArray(
        (error.graphQLErrors[0]?.extensions?.originalError as any)?.message
      )
        ? (error.graphQLErrors[0]?.extensions?.originalError as any).message
        : [
            (error.graphQLErrors[0]?.extensions?.originalError as any)
              ?.message || error.message,
          ];

      if (Array.isArray(validationErrors)) {
        setFieldErrors(validationErrors);
      } else {
        setGeneralError(error.message || "Please fill in the necessary data");
      }
    },
  });
  const { loading: loadingArtwork, data } = useQuery(GET_ARTWORK_BYID, {
    variables: {
      artworkId: artworkId,
    },
  });

  const [userInput, setUserInput] = useState({
    title: "",
    description: "",
    imageHash: "",
    material: "",
    category: "",
    culturalOrigin: "",
    yearCreated: "",
    widthCm: "",
    heightCm: "",
    isAvailable: Boolean,
    isFeatured: Boolean,
    price: "",
    currency: "",
  });

  const artworkItem = data?.getArtworkById;
  useEffect(() => {
    if (artworkItem) {
      setUserInput({
        title: artworkItem.title || "",
        description: artworkItem.description || "",
        imageHash: artworkItem.imageHash || "",
        material: artworkItem.material || "",
        category: artworkItem.category || "",
        culturalOrigin: artworkItem.culturalOrigin || "",
        yearCreated: artworkItem.yearCreated?.toString() || "",
        widthCm: artworkItem.widthCm?.toString() || "",
        heightCm: artworkItem.heightCm?.toString() || "",
        isAvailable: artworkItem.isAvailable ?? true,
        isFeatured: artworkItem.isFeatured ?? false,
        price: artworkItem.price?.toString() || "",
        currency: artworkItem.currency || "",
      });
    }
  }, [artworkItem]);

  const artworkData = {
    title: userInput.title,
    description: userInput.description,
    culturalOrigin: userInput.culturalOrigin,
    imageHash: userInput.imageHash || undefined,
    material: userInput.material || undefined,
    yearCreated: Number(userInput.yearCreated) || undefined,
    category: userInput.category,
    widthCm: Number(userInput.widthCm) || undefined,
    heightCm: Number(userInput.heightCm) || undefined,
    isAvailable: userInput.isAvailable || true,
    isFeatured: userInput.isFeatured || false,
    price: Number(userInput.price),
    currency: userInput.currency,
  };

  const changeHandler = (identifier: string, value: string) => {
    setUserInput((prev) => ({
      ...prev,
      [identifier]:
        identifier === "isAvailable" || identifier === "isFeatured"
          ? value === "true"
          : value,
    }));
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !userInput.title.trim() ||
      !userInput.description.trim() ||
      !userInput.category.trim() ||
      !userInput.culturalOrigin.trim() ||
      !userInput.price.trim() ||
      !userInput.currency.trim()
    ) {
      setGeneralError("Please fill all the necessary fields.");
      console.log("error");
      return;
    }

    await updateArtwork({
      variables: {
        artworkId: Number(artworkId),
        updateArtworkInput: artworkData,
      },
      refetchQueries: [
        { query: GET_ARTWORK },
        { query: GET_ARTWORK_BYID, variables: { artworkId: artworkId } },
      ],
    });

    onCloseEdit();
  };

  const today = new Date();
  const currentYear = today.getFullYear();

  return (
    <div className="absolute top-0 left-0 z-50 w-full h-full flex pt-1 justify-center bg-black bg-opacity-15">
      <div className=" bg-white p-4 rounded-sm relative">
        <p className=" text-xl text-red-950 font-semibold mb-1">
          Edit Artwork {loadingArtwork && "Loading..."}
        </p>
        <button onClick={onCloseEdit} className=" absolute right-4 top-4">
          X
        </button>
        <form onSubmit={submitHandler}>
          <div className=" flex-1 flex flex-col mb-3">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              className=" border outline-blue-500 rounded-sm pl-2 py-1"
              type="text"
              placeholder="Title..."
              value={userInput.title}
              onChange={(e) => changeHandler("title", e.target.value)}
            />
          </div>
          <div className=" flex-1 flex flex-col mb-3">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              className=" border outline-blue-500 rounded-sm pl-2 py-1"
              value={userInput.description}
              onChange={(e) => changeHandler("description", e.target.value)}
            ></textarea>
          </div>
          <div className=" flex-1 flex flex-col mb-3">
            <label htmlFor="culturalOrigin">Cultural Origin</label>
            <textarea
              id="culturalOrigin"
              className=" border outline-blue-500 rounded-sm pl-2 py-1"
              value={userInput.culturalOrigin}
              onChange={(e) => changeHandler("culturalOrigin", e.target.value)}
            ></textarea>
          </div>
          <div className=" flex-1 flex flex-col mb-3">
            <label htmlFor="imageHash">Image Hash</label>
            <input
              id="imageHash"
              className=" border outline-blue-500 rounded-sm pl-2 py-1"
              type="text"
              placeholder="imageHash..."
              value={userInput.imageHash}
              onChange={(e) => changeHandler("imageHash", e.target.value)}
            />
          </div>
          <div className=" flex gap-2 mb-3">
            <div className=" flex-1 flex flex-col mb-3">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                className=" border outline-blue-500 rounded-sm pl-2 py-1"
                value={userInput.category}
                onChange={(e) => changeHandler("category", e.target.value)}
              >
                <option value="">Select</option>
                <option value="PAINTING">Painting</option>
                <option value="SCULPTURE">Sculpture</option>
                <option value="TEXTILE">Testile</option>
                <option value="JEWELRY">Jewerly</option>
              </select>
            </div>
            <div className=" flex-1 flex flex-col mb-3">
              <label htmlFor="material">Material</label>
              <input
                id="material"
                className=" border outline-blue-500 rounded-sm pl-2 py-1"
                type="text"
                placeholder="Material..."
                value={userInput.material}
                onChange={(e) => changeHandler("material", e.target.value)}
              />
            </div>
          </div>
          <div className=" flex gap-1">
            <div className=" flex-1 flex flex-col mb-3">
              <label htmlFor="widthCm">Width</label>
              <input
                id="widthCm"
                className=" border outline-blue-500 rounded-sm pl-2 py-1"
                type="number"
                step="any"
                placeholder="Width"
                value={userInput.widthCm}
                onChange={(e) => changeHandler("widthCm", e.target.value)}
              />
            </div>
            <div className=" flex-1 flex flex-col mb-3">
              <label htmlFor="heightCm">Height</label>
              <input
                id="heightCm"
                className=" border outline-blue-500 rounded-sm pl-2 py-1"
                type="number"
                step="any"
                placeholder="Height"
                value={userInput.heightCm}
                onChange={(e) => changeHandler("heightCm", e.target.value)}
              />
            </div>
            <div className=" flex-1 flex flex-col mb-3">
              <label htmlFor="year">Year created</label>
              <input
                id="year"
                className=" border outline-blue-500 rounded-sm pl-2 py-1"
                type="number"
                min="1900"
                max={`${currentYear}`}
                step="1"
                placeholder="Year"
                value={userInput.yearCreated}
                onChange={(e) => changeHandler("yearCreated", e.target.value)}
              />
            </div>
          </div>
          {/* vailability */}
          <div className=" flex gap-2">
            <div className=" flex-1 flex flex-col mb-3">
              <label htmlFor="isAvailable">Available</label>
              <select
                id="isAvailable"
                className=" border outline-blue-500 rounded-sm pl-2 py-1"
                value={userInput.isAvailable.toString()}
                onChange={(e) => changeHandler("isAvailable", e.target.value)}
              >
                <option value="">Select</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
            <div className=" flex-1 flex flex-col mb-3">
              <label htmlFor="isFeatured">Featured</label>
              <select
                id="isFeatured"
                className=" border outline-blue-500 rounded-sm pl-2 py-1"
                value={userInput.isFeatured.toString()}
                onChange={(e) => changeHandler("isFeatured", e.target.value)}
              >
                <option value="">Select</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
          </div>
          <div className=" flex gap-2">
            <div className=" flex-1 flex flex-col mb-3">
              <label htmlFor="price">Price</label>
              <input
                id="price"
                className=" border outline-blue-500 rounded-sm pl-2 py-1"
                type="number"
                step="any"
                placeholder="Price"
                value={userInput.price}
                onChange={(e) => changeHandler("price", e.target.value)}
              />
            </div>
            <div className=" flex-1 flex flex-col mb-3">
              <label htmlFor="currency">Currency</label>
              <select
                id="currency"
                className=" border outline-blue-500 rounded-sm pl-2 py-1"
                value={userInput.currency}
                onChange={(e) => changeHandler("currency", e.target.value)}
              >
                <option value="">Select</option>
                <option value="USD">USD</option>
              </select>
            </div>
          </div>
          {generalError && (
            <p className="text-xs text-red-700 bg-red-100 rounded-sm mb-2 p-1">
              {generalError}
            </p>
          )}

          {fieldErrors.length > 0 && (
            <ul className="text-xs text-red-700 bg-red-100 rounded-sm mb-2 p-1">
              {fieldErrors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          )}
          <button className=" w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-sm shadow-sm hover:shadow-md">
            {loading ? "Adding artwork..." : "Add Artwork"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditArtwork;
