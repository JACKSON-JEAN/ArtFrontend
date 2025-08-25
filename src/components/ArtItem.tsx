import React, { useState } from "react";
import img1 from "../images/art1.jpg";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { BsBag, BsBagCheck } from "react-icons/bs";
import { useCart } from "../context/cart.context";
import { Link } from "react-router-dom";
import { useToast } from "../context/ToastContext";

type ArtItemProps = {
  id: number;
  title: string;
  material?: string;
  heightCm?: number;
  category: string;
  widthCm?: number;
  isAvailable: boolean;
  showButton?: boolean;
  artworkId: number;
  price: number;
  media: {
    id: number;
    url: string;
    type: "IMAGE" | "VIDEO";
  }[];
};

const ArtItem: React.FC<ArtItemProps> = ({
  id,
  title,
  material,
  heightCm,
  widthCm,
  category,
  price,
  artworkId,
  isAvailable,
  media,
}) => {
  const ShoppingIcon = BsBag as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;
  const AddedIcon = BsBagCheck as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;
  const FavoriteIcon = IoMdHeartEmpty as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;
  const FavoriteFullIcon = IoMdHeart as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;
  const primaryMedia = media[0];
  const { addToCart, removeFromCart, cart } = useCart();
  const [isLiked, setIsLiked] = useState(false)
  const {success} = useToast()

  const cartItem = cart.find((item) => item.artworkId === artworkId);

  const addHandler = () => {
    addToCart({
      id: id, 
      image: primaryMedia?.url,
      title: title,
      category: category,
      material: material,
      heightCm: heightCm,
      widthCm: widthCm,
      artworkId: artworkId,
      price: price,
      quantity: 1,
    });

    success("Item added to the cart successfully!")
  };

  const removeHandler = (itemId: number) =>{
    removeFromCart(itemId)
    success("Item removed successfully!")
  }

  const likeHandler = (itemId: number) =>{
    setIsLiked(!isLiked)
  }

  return (
    <div
      key={id}
      className=" w-full break-inside-avoid mb-4 border shadow-sm rounded-sm overflow-hidden"
    >
      <Link to={`/collection/${id}`}>
        <img
          loading="lazy"
          src={primaryMedia?.url ? primaryMedia?.url : img1}
          alt=""
        />
      </Link>

      <div className=" px-2 py-2">
        <div className=" flex items-center justify-between">
          {isAvailable && <p className=" font-semibold text-lg">${price.toLocaleString()}</p>}
          {!isAvailable && (
            <p className={`${"soldItem"} uppercase font-semibold`}>
              ${price} - Sold
            </p>
          )}
          {isAvailable && (
            <div className=" flex items-center gap-2">
              <p onClick={() =>likeHandler(id)} className=" text-xl cursor-pointer">
                {isLiked ? <p className=" text-red-500"><FavoriteFullIcon/></p> : <FavoriteIcon />}
              </p>
              <p className=" text-lg cursor-pointer">
                {cartItem ? (
                  <AddedIcon onClick={() => removeHandler(cartItem.id)} />
                ) : (
                  <ShoppingIcon onClick={addHandler} />
                )}
              </p>
            </div>
          )}
        </div>
        <p className=" text-lg">{title}</p>
        <div className={`${"material-price"} flex `}>
          {!material && (
            <p className=" text-base text-gray-600 capitalize">
              {category.toLowerCase()}
            </p>
          )}
          {material && <p className=" text-base text-gray-600">{material}</p>}
          {widthCm && (
            <p className=" text-gray-600 text-sm">
              {widthCm} X {heightCm} in
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtItem;
