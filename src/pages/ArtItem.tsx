import React from "react";
import img1 from "../images/img1.jpeg";
import Products from "../components/Products";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ARTWORK_BYID } from "../graphql/artwork";
import { FiHeart } from "react-icons/fi";
import { useCart } from "../context/cart.context";

const ArtItem = () => {
  const WishListIcon = FiHeart as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;

  const { cart, addToCart, removeFromCart } = useCart();

  const { artId } = useParams();
  const artworkId = isNaN(Number(artId)) ? 0 : Number(artId);

  const existing = cart.find((item) => item.artworkId === artworkId);

  const { loading, error, data } = useQuery(GET_ARTWORK_BYID, {
    variables: {
      artworkId: artworkId,
    },
  });

  const artwork = data?.getArtworkById;

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
          <p className=" text-lg capitalize mb-1 font-semibold">
            {artwork.title}
          </p>
          <div className=" mb-2">
            <p className=" text-slate-600 text-base">{artwork.description}</p>
            <p className=" text-slate-600 text-base mt-3">
              {artwork.culturalOrigin}
            </p>
          </div>
          
          <div className=" flex justify-between my-4">
            {artwork.widthCm && (
              
              <p className="text-gray-600 text-sm">
                Size: {artwork.widthCm} x {artwork.heightCm}in
              </p>
            )}
            {!artwork.material && <p className=" capitalize">
              Category:{" "}
              <span className=" text-slate-600">
                {artwork.category.toLowerCase()}
              </span>
            </p>}
            {artwork.material && <p className=" capitalize">
              Category:
              <span className=" text-slate-600">
                {artwork.material}
              </span>
            </p>}
            {artwork.yearCreated && <p>Year created: {artwork.yearCreated}</p>}
          </div>
          {artwork.isAvailable && (
            <div className=" flex gap-4">
              {existing ? (
                <button
                onClick={() => removeFromCart(existing.id)}
                className=" border-2 border-red-600 text-base hover:bg-red-100 text-red-600 font-semibold px-4 py-1 rounded-sm shadow-sm hover:shadow-md"
              >
                Remove From Cart
              </button>
              ) : (
                <button
                  onClick={addHandler}
                  className=" bg-blue-600 hover:bg-blue-700 text-base text-white font-semibold px-4 py-1 rounded-sm shadow-sm hover:shadow-md"
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
          )}
          {!artwork.isAvailable && (
            <p className={`${"soldItem"} uppercase font-semibold`}>
              ${artwork.price} - Sold
            </p>
          )}
        </div>
      </div>
      <div>
        <Products limit={4} subTitle="Similar Artwork" />
      </div>
    </div>
  );
};

export default ArtItem;
