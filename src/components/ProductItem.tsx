import React from "react";
import img1 from "../images/art1.jpg";
import { useCart } from "../context/cart.context";
import { Link } from "react-router-dom";
import { IoMdHeartEmpty } from "react-icons/io";
import { BsBag, BsBagCheck } from "react-icons/bs";

type ProductItemProps = {
  id: number;
  title: string;
  material?: string;
  heightCm?: number;
  category: string;
  widthCm?: number;
  isFeatured: boolean;
  isAvailable: boolean
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
  material,
  heightCm,
  widthCm,
  category,
  isAvailable,
  price,
  artworkId,
  media,
}) => {
  const primaryMedia = media[0];
  const ShoppingIcon = BsBag as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;
  const AddedIcon = BsBagCheck as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;
  const WishListIcon = IoMdHeartEmpty as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;

  const { addToCart, removeFromCart, cart } = useCart();

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
      <section>
        <div className=" px-2 py-2">
          <div className=" flex items-center justify-between">
            {isAvailable && <p className=" font-semibold text-lg">${price}</p>}
            {!isAvailable && <p className={`${"soldItem"} uppercase font-semibold`}>${price} - Sold</p>}
            {isAvailable && <div className=" flex items-start gap-4">
              <p className=" text-xl cursor-pointer">
                <WishListIcon />
              </p>
              <p className=" text-lg cursor-pointer">
                {existing ? (
                  <AddedIcon onClick={() =>removeFromCart(existing.id)} />
                ) : existingArtwork ? (
                  <AddedIcon onClick={() =>removeFromCart(existingArtwork.id)} />
                ) : (
                  <ShoppingIcon onClick={addHandler} />
                )}
              </p>
            </div>}
            
          </div>
          <p className=" text-lg">{title}</p>
          <div className=" flex items-center justify-between">
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
      </section>
    </div>
  );
};

export default ProductItem;
