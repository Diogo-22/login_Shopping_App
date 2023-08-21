import { Outlet } from "react-router-dom";
import React from "react";
import Nav from "./Nav";
import Header from "../groceryUI/Header";
import Footer from "../groceryUI/Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="App">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
