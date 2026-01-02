import React from "react";
import { useCart } from "../context/cart.context";
import { PiTrashSimpleBold } from "react-icons/pi";
import ImageComponent from "./ImageComponent";
import { Link } from "react-router-dom";

interface cartItemProps {
  id: number;
  artworkId: number;
  image: string;
  imageHash?: string;
  title: string;
  description: string;
  category: string;
  material?: string;
  heightCm?: number;
  widthCm?: number;
  quantity: number;
  price: number;
}

const CartItem: React.FC<cartItemProps> = ({
  id,
  artworkId,
  image,
  imageHash,
  title,
  description,
  category,
  material,
  heightCm,
  widthCm,
  quantity,
  price,
}) => {
  const DeleteIcon = PiTrashSimpleBold as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;
  const { removeFromCart } = useCart();

  return (
    <div className=" w-full flex pb-2 mb-3 border-b">
      <div className={`${"cartItem"} w-full flex`}>
        <div className=" w-[200px] rounded-sm overflow-hidden">
          <Link to={`/collection/${artworkId}`}>
            <ImageComponent
              src={image}
              name={description}
              imageHash={imageHash ? imageHash : "LMGHq}E3w[nOuhm-jFrrGaiwt6iw"}
            />
          </Link>
        </div>
        <section className=" flex gap-1 flex-col w-full ">
          <div className={`${"price_title"}`}>
            <p className=" text-base">{title}</p>
            <p className=" hidden lg:block text-slate-500">{description}</p>
            
              <p className=" block lg:hidden text-slate-500">
                {description.length > 50
                  ? description.slice(0, 47) + "..."
                  : description}
              </p>
            
          </div>
          {material && (
            <p>
              <span className=" ">Category:</span>{" "}
              <span className=" text-slate-500">{material}</span>
            </p>
          )}
          {!material && (
            <p>
              <span className=" ">Category:</span>{" "}
              <span className=" text-slate-500 capitalize">
                {category.toLowerCase()}
              </span>
            </p>
          )}

          {widthCm && (
            <p>
              Size:{" "}
              <span className=" text-slate-500 text-sm">
                {widthCm} x {heightCm} in
              </span>
            </p>
          )}

          <div className=" flex justify-between">
            <p
              onClick={() => removeFromCart(id)}
              className=" text-red-600 hover:text-red-700 cursor-pointer text-sm flex gap-0.5 items-center"
            >
              <span>
                <DeleteIcon />
              </span>{" "}
              Remove
            </p>
            <p className=" font-semibold">${(price * quantity).toFixed(2)}</p>
          </div>
        </section>
      </div>
      {/* <p className=" font-semibold">${(price * quantity).toFixed(2)}</p> */}
    </div>
  );
};

export default CartItem;
