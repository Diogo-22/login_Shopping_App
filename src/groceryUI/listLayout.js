import React from "react";
import Header from "./Header";
import useGList from "../hooks/useGList";
//import Nav from './Nav';
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const ListLayout = () => {
  const { items } = useGList();
  return (
    <div className="App">
      <Header title="Grocery List" />
      <Outlet />
      <Footer length={items.length} />
    </div>
  );
};

export default ListLayout;
