import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

const Layout = () => {
  return (
    <div className=" relative">
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
