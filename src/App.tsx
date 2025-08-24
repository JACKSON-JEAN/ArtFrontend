import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./utils/router";
import { SearchContextProvider } from "./context/search.context";
import { CartProvider } from "./context/cart.context";
import { ToastProvider } from "./context/ToastContext";

function App() {
  return (
    <CartProvider>
      <ToastProvider>
        <SearchContextProvider>
          <div className=" w-full">
            <RouterProvider router={router} />
          </div>
        </SearchContextProvider>
      </ToastProvider>
    </CartProvider>
  );
}

export default App;
