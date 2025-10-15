import React, { useEffect, useRef, useState } from "react";
import img1 from "../images/img1.jpeg";
import Products from "../components/Products";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ARTWORK_BYID } from "../graphql/artwork";
import { IoMdHeartEmpty } from "react-icons/io";
import { useCart } from "../context/cart.context";
import { ArrowDownIcon } from "../components/icons";
import Rating from "../components/Rating";
import AddRating from "../components/AddRating";
import AddReviews from "../components/AddReviews";
import ImageComponent from "../components/ImageComponent";
import { Helmet } from "@dr.pogodin/react-helmet";

const ArtItem = () => {
  const WishListIcon = IoMdHeartEmpty as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;

  const { cart, addToCart, removeFromCart } = useCart();
  const [isOpenAddRating, SetIsOpenAddRating] = useState(false);
  const [addReview, setAddReview] = useState(false);

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

  const RatingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        RatingRef.current &&
        !RatingRef.current.contains(event.target as Node)
      ) {
        SetIsOpenAddRating(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // const originalPrice = ((10/100) * artwork.price) + artwork.price

  if (artworkId === 0) {
    return <p>Invalid art ID. Please check the URL and try again.</p>;
  }

  if (loading)
    return (
      <div
        className={`${"wrapper"} w-full px-10 sm:px-16 min-h-screen py-4 bg-slate-50`}
      >
        <p>Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className=" w-full px-10 sm:px-16 min-h-screen py-4 bg-slate-50">
        <p className=" text-center font-semibold">{error.message}</p>
      </div>
    );
  return (
    <>
      <Helmet>
        <title>
          {artwork?.title
            ? `${artwork.title} | Pearl Art Galleries`
            : "Artwork | Pearl Art Galleries"}
        </title>
        <meta
          name="description"
          content={
            artwork?.description
              ? artwork.description.slice(0, 155)
              : "Explore authentic African art collections at Pearl Art Galleries."
          }
        />
        <link
          rel="canonical"
          href={`https://www.pearlartgalleries.com/collection/${artId}`}
        />

        {/* Open Graph */}
        <meta property="og:title" content={artwork?.title || "Artwork"} />
        <meta
          property="og:description"
          content={
            artwork?.description
              ? artwork.description.slice(0, 155)
              : "Discover unique African art at Pearl Art Galleries."
          }
        />
        <meta
          property="og:image"
          content={
            artworkMedia ||
            "https://res.cloudinary.com/dsawd9eso/image/upload/v1760267152/kampala_1_jltha2.jpg"
          }
        />
        <meta
          property="og:url"
          content={`https://www.pearlartgalleries.com/collection/${artId}`}
        />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={artwork?.title || "Artwork"} />
        <meta
          name="twitter:description"
          content={
            artwork?.description
              ? artwork.description.slice(0, 155)
              : "Explore African art collections at Pearl Art Galleries."
          }
        />
        <meta
          name="twitter:image"
          content={
            artworkMedia ||
            "https://res.cloudinary.com/dsawd9eso/image/upload/v1760267152/kampala_1_jltha2.jpg"
          }
        />
      </Helmet>

      <div
        className={`${"wrapper"} w-full px-10 sm:px-16 min-h-screen py-4 bg-slate-50`}
      >
        {addReview && (
          <AddReviews artId={artwork.id} onClose={() => setAddReview(false)} />
        )}
        <div className={`${"artItem"} flex mb-6`}>
          <div className=" flex-1">
            <div className=" w-full p-2 shadow-sm border rounded-sm">
              <ImageComponent
                src={artworkMedia}
                name={artwork.title}
                imageHash={
                  artwork.imageHash
                    ? artwork.imageHash
                    : "LMGHq}E3w[nOuhm-jFrrGaiwt6iw"
                }
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

            <div className=" flex justify-between my-3">
              {artwork.widthCm && (
                <p className="text-gray-600 text-sm">
                  Size: {artwork.widthCm} x {artwork.heightCm}in
                </p>
              )}
              {!artwork.material && (
                <p className=" capitalize">
                  Category:{" "}
                  <span className=" text-slate-600">
                    {artwork.category.toLowerCase()}
                  </span>
                </p>
              )}
              {artwork.material && (
                <p className=" capitalize">
                  Category:{" "}
                  <span className=" text-slate-600">{artwork.material}</span>
                </p>
              )}
              {artwork.yearCreated && (
                <p>Year created: {artwork.yearCreated}</p>
              )}
            </div>
            <div className=" relative flex gap-2">
              <Rating count={4} rating={4.6} />
              <p
                onClick={() => SetIsOpenAddRating(!isOpenAddRating)}
                className=" cursor-pointer text-base"
              >
                <ArrowDownIcon />
              </p>
              {isOpenAddRating && (
                <div ref={RatingRef}>
                  <AddRating
                    onOpen={() => setAddReview(true)}
                    itemId={artwork.id}
                  />
                </div>
              )}
            </div>
            {artwork.isAvailable && (
              <div className=" flex justify-between">
                <p className=" font-semibold text-lg">
                  ${artwork.price.toLocaleString()}
                </p>
                {existing ? (
                  <button
                    onClick={() => removeFromCart(existing.id)}
                    className=" border-2 border-red-600 text-base text-red-600 hover:bg-red-50 font-semibold px-3 py-1 rounded-sm shadow-sm hover:shadow-md"
                  >
                    Remove From Cart
                  </button>
                ) : (
                  <div className=" flex gap-4">
                    <div className=" flex items-end">
                      <button className=" bg-slate-300 hover:bg-slate-200 text-base px-3 py-2 rounded-sm shadow-sm border">
                        <WishListIcon />
                        {/* <FullWishListIcon className=' text-red-600'/> */}
                      </button>
                    </div>
                    <button
                      onClick={addHandler}
                      className=" bg-blue-600 hover:bg-blue-700 text-base text-white font-semibold px-4 py-1 rounded-sm shadow-sm hover:shadow-md"
                    >
                      Add To Cart
                    </button>
                  </div>
                )}
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
    </>
  );
};

export default ArtItem;
