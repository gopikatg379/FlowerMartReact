import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import "../assets/css/Layout.css"; // Create this file for styling

const Layout = () => {
  return (
    <div className="layout-container">
      <div className="content-wrap">
        <Outlet /> {/* This will render the routed component */}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
