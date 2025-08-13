import React from "react";
import img1 from "../images/art1.jpg";
import { IoMdHeartEmpty } from "react-icons/io";
import { BsBag, BsBagCheck } from "react-icons/bs";
import { useCart } from "../context/cart.context";

type ArtItemProps = {
  id: number;
  title: string;
  heightCm?: number;
  category: string;
  widthCm?: number;
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
    heightCm,
    widthCm,
    category,
    price,
    artworkId,
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
    const primaryMedia = media[0];
    const { addToCart, removeFromCart, cart } = useCart();
  
    const cartItem = cart.find(item => item.artworkId === artworkId);

    const addHandler = () => {
      addToCart({
        id: id, // You might want to use artworkId here instead of id if that's your unique identifier
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
  
    return (
      <div
        key={id}
        className=" w-full break-inside-avoid mb-4 border shadow-sm rounded-sm overflow-hidden"
      >
        <img src={primaryMedia?.url ? primaryMedia?.url : img1} alt="" />
        <div className=" px-2 py-2">
          <div className=" flex items-center justify-between">
            <p className=" font-semibold text-lg">${price}</p>
            <div className=" flex items-center gap-2">
              <p className=" text-xl cursor-pointer">
                <FavoriteIcon />
              </p>
              <p className=" text-lg cursor-pointer">
                {cartItem ? (
                  <AddedIcon onClick={() =>removeFromCart(cartItem.id)} />
                ) : (
                  <ShoppingIcon onClick={addHandler} />
                )}
              </p>
            </div>
          </div>
          <p className=" text-lg">{title}</p>
          {widthCm && (
            <p className=" text-gray-600">
              {widthCm} X {heightCm} Cm
            </p>
          )}
        </div>
      </div>
    );
  };

export default ArtItem;
