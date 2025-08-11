import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { ADD_ARTWORK, GET_ARTWORK } from "../graphql/artwork";

interface AddArtworkProps {
    onClose: () => void
}

const AddArtwork: React.FC<AddArtworkProps> = ({onClose}) => {
  const [generalError, setGeneralError] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<string[]>([]);
  

  const [userInput, setUserInput] = useState({
    title: "",
    description: "",
    category: "",
    culturalOrigin: "",
    price: "",
    currency: "",
  });

  const [addArtwork, { loading }] = useMutation(ADD_ARTWORK, {
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

  const changeHandler = (identifier: string, value: string) => {
    setUserInput((prev) => ({
      ...prev,
      [identifier]: value,
    }));
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !userInput.title.trim() ||
      !userInput.description.trim() ||
      !userInput.culturalOrigin.trim() ||
      !userInput.category.trim() ||
      !userInput.price.trim() ||
      !userInput.currency.trim()
    ) {
      setGeneralError("Please fill all the fields");
      return;
    }

    await addArtwork({
      variables: {
        addArtworkInput: {
          title: userInput.title,
          description: userInput.description,
          category: userInput.category,
          culturalOrigin: userInput.culturalOrigin,
          price: Number(userInput.price),
          currency: userInput.currency,
        },
      },
      refetchQueries: [GET_ARTWORK]
    });
    setUserInput({
        title: "",
        description: "",
        category: "",
        culturalOrigin: "",
        price: "",
        currency: "",  
    })
  };
  return (
    <div
      className="absolute top-0 left-0 z-50 w-full h-full flex pt-36 justify-center bg-black bg-opacity-15"
    >
      <div className=" bg-white max-h-[425px] p-4 rounded-sm relative">
        <p className=" text-xl text-red-950 font-semibold mb-1">Add Artwork</p>
        <button onClick={onClose} className=" absolute right-4 top-4">X</button>
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
            {loading? "Adding artwork..." : "Add Artwork"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddArtwork;
