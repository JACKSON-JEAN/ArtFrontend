import CartItem from "../components/CartItem";
import cartImage from "../images/img2.jpeg";
import { useCart } from "../context/cart.context";
import { Link } from "react-router-dom";
import Products from "../components/Products";

const Cart = () => {
  const { cart, total } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={`${"wrapper"} w-full px-10 sm:px-16 min-h-screen py-4 bg-slate-50`}>
      <div className=" w-full flex mb-8">
        {cart.length > 0 && (
          <div className=" w-full flex md:flex-row flex-col gap-3">
            <section className=" lg:w-[calc(100%-300px)] w-full order-2 md:order-1">
              <div className=" bg-white border p-2">
                <div className=" flex justify-between border-b mb-4">
                  <p className=" text-xl text-red-950 font-semibold mb-2">
                    Shopping Cart
                  </p>
                  <p className="price_subtitle">Price</p>
                </div>
                <div>
                  {cart.map((item) => (
                    <CartItem
                      key={item.id}
                      id={item.id}
                      image={item.image? item.image: cartImage}
                      description={item.title}
                      category={item.category}
                      widthCm={item.widthCm}
                      heightCm={item.heightCm}
                      quantity={item.quantity}
                      price={item.price}
                    />
                  ))}
                </div>
              </div>
            </section>
            <section className=" w-full lg:w-[300px] order-1 md:order-2 sm:sticky lg:top-0 lg:left-0">
              <div className=" bg-white rounded-sm border px-3 py-2">
                <p className=" mb-1">
                  {`Order summary(${totalItems} items):`}{" "}
                  <span className=" font-semibold">${total.toFixed(2)}</span>
                </p>
                <div className=" border-t">
                  <button className=" bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow-md text-white py-0.5 rounded-sm w-full mt-2">
                    Proceed to checkout
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}
        {cart.length < 1 && (
          <div className=" w-full text-center">
            <div className=" mb-6">
              <p className=" font-semibold text-lg">Your cart is empty!</p>
              <p>Browse our collections and discover our best deals.</p>
            </div>
            <Link
              to="/collection"
              className=" bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-1.5 capitalize rounded-sm shadow-sm"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
      <Products limit={4} subTitle="Artwork you may like"/>
    </div>
  );
};

export default Cart;
