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
import ArtItem from "../pages/ArtItem";
import ArtworkManagement from "../pages/ArtworkManagement";
import Users from "../components/pages/Users";
import Reviews from "../pages/Reviews";
import Artists from "../pages/Artists";
import Favorites from "../pages/Favorites";
import Unauthorised from "../pages/Unauthorised";
import NotFound from "../pages/NotFound";
import ProtectedRoutes from "./protectedRoutes";
import ScrollToTop from "../components/ScrollToTop";
import Addresses from "../pages/Addresses";

export const router = createBrowserRouter([
  {
    path: "signup",
    element: (
      <>
        <ScrollToTop />
        <Signup />
      </>
    ),
  },
  {
    path: "signin",
    element: (
      <>
        <ScrollToTop />
        <Signin />
      </>
    ),
  },
  {
    path: "unauthorised",
    element: (
      <>
        <ScrollToTop />
        <Unauthorised />
      </>
    ),
  },
  {
    path: "*",
    errorElement: (
      <>
        <ScrollToTop />
        <NotFound />
      </>
    ),
  },
  {
    element: (
      <>
        <ScrollToTop />
        <ProtectedRoutes allowedRoles={["ADMIN"]} />
      </>
    ),
    path: "dashboard",
    children: [
      { index: true, element: <ArtworkManagement /> },
      { path: "users", element: <Users /> },
    ],
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      {
        path: "collection",
        children: [
          { index: true, element: <Collection /> },
          { path: ":artId", element: <ArtItem /> },
        ],
      },
      { path: "reviews", element: <Reviews /> },
      { path: "artists", element: <Artists /> },
      { path: "contact", element: <Contact /> },
      { path: "cart", element: <Cart /> },
      { path: "address", element: <Addresses /> },
      { path: "artwork", element: <ArtworkManagement /> },
      { path: "favorites", element: <Favorites /> },
    ],
  },
]);
