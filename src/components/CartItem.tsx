import React from "react";
import { useCart } from "../context/cart.context";
import { PiTrashSimpleBold } from "react-icons/pi";

interface cartItemProps {
  id: number;
  image: string;
  description: string;
  category: string;
  material?: string
  heightCm?: number
  widthCm?: number
  quantity: number;
  price: number
}

const CartItem: React.FC<cartItemProps> = ({
  id,
  image,
  description,
  category,
  material,
  heightCm,
  widthCm,
  quantity,
  price
}) => {
  const DeleteIcon = PiTrashSimpleBold as React.ComponentType<
          React.SVGProps<SVGSVGElement>
        >;
  const { removeFromCart} = useCart()

  return (
    <div className=" w-full flex pb-2 mb-3 border-b">
      <div className={`${"cartItem"} w-full flex`}>
        <div className=" w-[200px] rounded-sm overflow-hidden">
          <img loading="lazy" className=" w-full" src={image} alt={description} />
        </div>
        <section className=" flex gap-1 flex-col w-full ">
          <div className={`${"price_title"} flex justify-between`}>
            <p>{description}</p>
            
          </div>
          {material && <p><span className=" font-semibold">Category:</span> <span className=" text-slate-400">{material}</span></p>}
          {!material && <p><span className=" font-semibold">Category:</span> <span className=" text-slate-400 capitalize">{category.toLowerCase()}</span></p>}
          
          {widthCm &&<p>
            Size: <span className=" font-light">{widthCm} x {heightCm}in</span>
          </p>}
          
          <div className=" flex justify-between">
            <p onClick={() => removeFromCart(id)} className=" text-red-600 hover:text-red-700 cursor-pointer text-sm flex gap-0.5 items-center"><span><DeleteIcon/></span> Remove</p>
            <p className=" font-semibold">${(price * quantity).toFixed(2)}</p>
          </div>
        </section>
      </div>
      {/* <p className=" font-semibold">${(price * quantity).toFixed(2)}</p> */}
    </div>
  );
};

export default CartItem;
