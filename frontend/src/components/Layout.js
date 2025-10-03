import React from "react";
import { Outlet } from "react-router-dom";
import TopNavbar from "./TopNavbar";

function Layout() {
  return (
    <>
      <TopNavbar />
      <Outlet />
    </>
  );
}

export default Layout;
