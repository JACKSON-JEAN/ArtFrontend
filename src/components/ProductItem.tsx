import React from "react";
import {
  PiPlusBold,
  PiMinusBold,
  PiStarFill,
  PiStar,
  PiTrashSimpleBold,
} from "react-icons/pi";
import img1 from "../images/art1.jpg";
import { useCart } from "../context/cart.context";
import { Link } from "react-router-dom";

type ProductItemProps = {
  id: number;
  title: string;
  heightCm?: number;
  category: string;
  widthCm?: number;
  isFeatured: boolean;
  showButton?: boolean;
  artworkId: number;
  price: number;
  media: {
    id: number;
    url: string;
    type: "IMAGE" | "VIDEO";
  }[];
};

const ProductItem: React.FC<ProductItemProps> = ({
  id,
  title,
  heightCm,
  widthCm,
  isFeatured,
  category,
  showButton,
  price,
  artworkId,
  media,
}) => {
  const primaryMedia = media[0];
  // const hasMedia = primaryMedia.url;
  const StartIcon = PiStarFill as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;
  const StarOutlineIcon = PiStar as React.ComponentType<
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

  const { addToCart, increaseQuantity, decreaseQuantity, cart } = useCart();

  const addHandler = () => {
    addToCart({
      id: id,
      image: primaryMedia?.url,
      title: title,
      category: category,
      heightCm: heightCm,
      widthCm: widthCm,
      artworkId: artworkId,
      price: price,
      quantity: 1,
    });
  };

  const existing = cart.find((item) => item.id === id);
  const existingArtwork = cart.find((item) => item.artworkId === artworkId);

  return (
    <div className=" border rounded-sm bg-white overflow-hidden">
      <section className=" w-full h-40 overflow-hidden">
        <Link to={`/collection/${id}`}>
          <img
            loading="lazy"
            alt=""
            className=" h-full w-full object-cover"
            src={primaryMedia?.url ? primaryMedia?.url : img1}
          />
        </Link>
      </section>
      <section className=" border-t px-2 py-2">
        <p className=" text-gray-600">{title}</p>
        {showButton && (
          <div className=" flex items-center gap-3 mb-1">
            <div className=" flex items-center gap-1">
              <StartIcon className=" text-[12px] text-orange-400" />
              <StartIcon className=" text-[12px] text-orange-400" />
              <StartIcon className=" text-[12px] text-orange-400" />
              <StartIcon className=" text-[12px] text-orange-400" />
              <StarOutlineIcon className=" text-[12px] text-orange-400" />
            </div>
            <p className=" text-[10px]">(4/5)</p>
          </div>
        )}
        <div className="flex items-center justify-between">
          <p className=" font-semibold text-sm">${price}</p>
          {showButton && (
            <div className=" ">
              {existing ? (
                <div className=" flex justify-between w-20">
                  <button
                    onClick={() => decreaseQuantity(id)}
                    className=" bg-blue-600 hover:bg-blue-700 text-xs text-white px-2 rounded-sm shadow-sm hover:shadow-md"
                  >
                    {existing.quantity < 2 ? <DeleteIcon /> : <MinusIcon />}
                  </button>
                  <p className=" text-gray-600">
                    {existing && existing.quantity}
                  </p>
                  <button
                    onClick={() => increaseQuantity(id)}
                    className=" bg-blue-600 hover:bg-blue-700 text-xs font-semibold text-white px-2 rounded-sm shadow-sm hover:shadow-md"
                  >
                    <PlusIcon />
                  </button>
                </div>
              ) : existingArtwork ? (
                <div className=" flex justify-between w-20">
                  <button
                    onClick={() => decreaseQuantity(existingArtwork.id)}
                    className=" bg-blue-600 hover:bg-blue-700 text-xs text-white px-2 rounded-sm shadow-sm hover:shadow-md"
                  >
                    {existingArtwork.quantity < 2 ? (
                      <DeleteIcon />
                    ) : (
                      <MinusIcon />
                    )}
                  </button>
                  <p className=" text-gray-600">
                    {existingArtwork && existingArtwork.quantity}
                  </p>
                  <button
                    onClick={() => increaseQuantity(existingArtwork.id)}
                    className=" bg-blue-600 hover:bg-blue-700 text-xs font-semibold text-white px-2 rounded-sm shadow-sm hover:shadow-md"
                  >
                    <PlusIcon />
                  </button>
                </div>
              ) : (
                <div
                  onClick={addHandler}
                  className=" flex gap-1 items-center justify-center bg-blue-600 hover:bg-blue-700 text-xs font-semibold text-white px-3 py-1 rounded-sm cursor-pointer shadow-sm hover:shadow-md"
                >
                  <PlusIcon /> <span>Cart</span>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductItem;
