import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Layout from "./Layout";
import Signup from "../pages/Signup";
import Signin from "../pages/Signin";
import Cart from "../pages/Cart";
import Collection from "../pages/Collection";
import UploadArtworkMedia from "../components/UploadArtworkMedia";
import ArtItem from "../pages/ArtItem";
import ArtworkManagement from "../pages/ArtworkManagement";

export const router = createBrowserRouter([
  { path: "signup", element: <Signup /> },
  { path: "signin", element: <Signin /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      {path: "collection",
        children: [
          { index: true, element: <Collection /> },
          {path: ":artId", element: <ArtItem/>}
        ]
      },
      { path: "contact", element: <Contact /> },
      { path: "cart", element: <Cart /> },
      { path: "artwork", element: <ArtworkManagement/> },
      { path: "addMedia", element: <UploadArtworkMedia /> },
    ],
  },
]);
