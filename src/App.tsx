import React from 'react';
import './App.css';
import Home from './pages/Home';
import { RouterProvider } from 'react-router-dom';
import { router } from './utils/router';
import { SearchContextProvider } from './context/search.context';
import { CartProvider } from './context/cart.context';

function App() {
  return (
    
    <CartProvider>
      <SearchContextProvider>
      <div className=' w-full'>
        <RouterProvider router={router}/>
      </div>
    </SearchContextProvider>
    </CartProvider>
    
  );
}

export default App;
