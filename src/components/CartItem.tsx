import React from "react";
import { useCart } from "../context/cart.context";
import { PiPlusBold, PiMinusBold, PiTrashSimpleBold } from "react-icons/pi";

interface cartItemProps {
  id: number;
  image: string;
  description: string;
  category: string;
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
  heightCm,
  widthCm,
  quantity,
  price
}) => {
  const DeleteIcon = PiTrashSimpleBold as React.ComponentType<
          React.SVGProps<SVGSVGElement>
        >;
  const PlusIcon = PiPlusBold as React.ComponentType<
      React.SVGProps<SVGSVGElement>
    >;
  
    const MinusIcon = PiMinusBold as React.ComponentType<
      React.SVGProps<SVGSVGElement>
    >;
  const {increaseQuantity, decreaseQuantity, removeFromCart} = useCart()

  return (
    <div className=" w-full flex pb-2 mb-3 border-b">
      <div className={`${"cartItem"} w-full flex`}>
        <div className=" w-[200px] rounded-sm overflow-hidden">
          <img loading="lazy" className=" w-full" src={image} alt="" />
        </div>
        <section className=" flex gap-1 flex-col w-full ">
          <div className={`${"price_title"} flex justify-between`}>
            <p>{description}</p>
            <p className=" font-semibold">${(price * quantity).toFixed(2)}</p>
          </div>
          <p><span className=" font-semibold">Category:</span> <span className=" text-slate-400 capitalize">{category.toLowerCase()}</span></p>
          {heightCm &&<p>
            Size: <span className=" font-light">{heightCm} x {widthCm}</span>
          </p>}
          <p className={`${"derivery_msg"} mb-1 text-green-600`}>Delivered with in 7 days. Money back guarantee.</p>
          <div className=" flex justify-between">
            <p onClick={() => removeFromCart(id)} className=" text-red-600 hover:text-red-700 cursor-pointer text-sm flex gap-0.5 items-center"><span><DeleteIcon/></span> Remove</p>
            <div className=" w-24 flex justify-between items-center px-2 rounded-full border-2 border-red-950">
              <p onClick={() =>decreaseQuantity(id)} className=" text-sm cursor-pointer">{quantity < 2 ? <DeleteIcon/> : <MinusIcon/>}</p>
              <p>{quantity}</p>
              <p onClick={() =>increaseQuantity(id)} className=" text-sm cursor-pointer"><PlusIcon/></p>
            </div>
            
          </div>
        </section>
      </div>
      {/* <p className=" font-semibold">${(price * quantity).toFixed(2)}</p> */}
    </div>
  );
};

export default CartItem;
