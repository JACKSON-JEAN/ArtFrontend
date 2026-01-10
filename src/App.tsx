import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./utils/router";
import { SearchContextProvider } from "./context/search.context";
import { CartProvider } from "./context/cart.context";
import { ToastProvider } from "./context/ToastContext";
import React from "react";

class ChunkErrorBoundary extends React.Component<
    { children: React.ReactNode },
    { hasError: boolean }
  > {
    state = { hasError: false };

    static getDerivedStateFromError(error: any) {
      if (error?.message?.includes("Loading chunk")) {
        return { hasError: true };
      }
      return null;
    }

    render() {
      if (this.state.hasError) {
        return (
          <div className="flex flex-col items-center justify-center h-screen">
            <p>App updated. Please reload.</p>
            <button
              className="mt-3 px-4 py-2 bg-black text-white"
              onClick={() => window.location.reload()}
            >
              Reload
            </button>
          </div>
        );
      }
      return this.props.children;
    }
  }

function App() {

  return (
    <CartProvider>
      <ToastProvider>
        <SearchContextProvider>
          <div className=" w-full">
            <ChunkErrorBoundary>
              <RouterProvider router={router} />
            </ChunkErrorBoundary>
          </div>
        </SearchContextProvider>
      </ToastProvider>
    </CartProvider>
  );
}

export default App;
