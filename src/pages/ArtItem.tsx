import React from "react";
import img1 from "../images/img1.jpeg";
import Products from "../components/Products";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ARTWORK_BYID } from "../graphql/artwork";
import {
  PiStarFill,
  PiPlusBold,
  PiMinusBold,
  PiTrashSimpleBold,
} from "react-icons/pi";
import { FiHeart } from "react-icons/fi";
import { useCart } from "../context/cart.context";

const ArtItem = () => {
  const StartIcon = PiStarFill as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;
  const PlusIcon = PiPlusBold as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;

  const MinusIcon = PiMinusBold as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;

  const DeleteIcon = PiTrashSimpleBold as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;

  const WishListIcon = FiHeart as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;

  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useCart();

  const { artId } = useParams();
  const artworkId = isNaN(Number(artId)) ? 0 : Number(artId);

  const existing = cart.find((item) => item.id === artworkId);
  const existingArtwork = cart.find((item) => item.artworkId === artworkId);

  const { loading, error, data } = useQuery(GET_ARTWORK_BYID, {
    variables: {
      artworkId: artworkId,
    },
  });


  const artwork = data?.getArtworkById;
  console.log(artwork)

  const artworkMedia = artwork?.media[0]?.url ? artwork?.media[0]?.url : img1;

  const addHandler = () => {
    addToCart({
      id: artwork.id,
      image: artwork.media[0]?.url,
      title: artwork.title,
      category: artwork.category,
      heightCm: artwork.heightCm,
      widthCm: artwork.widthCm,
      artworkId: artwork.id,
      price: artwork.price,
      quantity: 1,
    });
  };

  // const originalPrice = ((10/100) * artwork.price) + artwork.price

  if (artworkId === 0) {
    return <p>Invalid art ID. Please check the URL and try again.</p>;
  }

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <div className=" w-full px-10 sm:px-16 min-h-screen py-4 bg-slate-50">
        <p className=" text-center font-semibold">{error.message}</p>
      </div>
    );
  return (
    <div
      className={`${"wrapper"} w-full px-10 sm:px-16 min-h-screen py-4 bg-slate-50`}
    >
      <div className={`${"artItem"} flex mb-6`}>
        <div className=" flex-1">
          <div className=" w-full p-2 shadow-sm border rounded-sm">
            <img
              src={artworkMedia}
              alt=""
              loading="lazy"
              className=" w-full object-cover rounded-sm"
            />
          </div>
        </div>

        <div className=" flex-1">
          <p className=" text-base capitalize mb-1">{artwork.title}</p>
          <div className=" flex justify-between mb-2">
            <div className=" flex gap-2">
              {/* <p className=' text-xs text-gray-500 line-through'>${originalPrice.toFixed(2)}</p> */}
              <p className=" text-sm font-bold">${artwork.price}</p>
            </div>
            <div className=" flex gap-1 items-center">
              <StartIcon className=" text-[12px] text-orange-400" />
              <p className=" text-sm font-semibold">4.5</p>
            </div>
          </div>
          <div className=" mb-2">
            <p className=" text-base">Description:</p>
            <p className=" text-slate-500 text-base">
              {artwork.description}
            </p>
            <p className=" text-slate-500 text-base mt-3">{artwork.culturalOrigin}</p>
          </div>
          <div className=" flex justify-between mb-2">
            {artwork.widthCm && (
              <p>
                Size: {artwork.widthCm} by {artwork.heightCm}cm
              </p>
            )}
            {artwork.weightKg && <p>Weight: {artwork.weightKg}kg</p>}
            <p>Category: {artwork.category}</p>
            {artwork.yearCreated && <p>Year created: {artwork.yearCreated}</p>}
          </div>
          <div className=" flex gap-4">
            {existing ? (
              <div className=" flex justify-between items-center w-[116px]">
                <button
                  onClick={() => decreaseQuantity(artwork.id)}
                  className=" bg-blue-600 hover:bg-blue-700 text-base text-white px-3 py-2 rounded-sm shadow-sm hover:shadow-md"
                >
                  {existing.quantity < 2 ? <DeleteIcon /> : <MinusIcon />}
                </button>
                <p className=" ">{existing && existing.quantity}</p>
                <button
                  onClick={() => increaseQuantity(artwork.id)}
                  className=" bg-blue-600 hover:bg-blue-700 text-base text-white px-3 py-2 rounded-sm shadow-sm hover:shadow-md"
                >
                  <PlusIcon />
                </button>
              </div>
            ) : existingArtwork ? (
              <div className=" flex justify-between items-center w-[116px]">
                <button
                  onClick={() => decreaseQuantity(existingArtwork.id)}
                  className=" bg-blue-600 hover:bg-blue-700 text-base text-white px-3 py-2 rounded-sm shadow-sm hover:shadow-md"
                >
                  {existingArtwork.quantity < 2 ? (
                    <DeleteIcon />
                  ) : (
                    <MinusIcon />
                  )}
                </button>
                <p className=" ">
                  {existingArtwork && existingArtwork.quantity}
                </p>
                <button
                  onClick={() => increaseQuantity(existingArtwork.id)}
                  className=" bg-blue-600 hover:bg-blue-700 text-base text-white px-3 py-2 rounded-sm shadow-sm hover:shadow-md"
                >
                  <PlusIcon />
                </button>
              </div>
            ) : (
              <button
                onClick={addHandler}
                className=" bg-blue-600 hover:bg-blue-700 text-base text-white px-4 py-1 rounded-sm shadow-sm hover:shadow-md"
              >
                Add To Cart
              </button>
            )}

            <div className=" flex items-end">
              <button className=" bg-slate-300 hover:bg-slate-200 text-base px-3 py-2 rounded-sm shadow-sm border">
                <WishListIcon />
                {/* <FullWishListIcon className=' text-red-600'/> */}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Products limit={4} subTitle="Similar Artwork" />
      </div>
    </div>
  );
};

export default ArtItem;
