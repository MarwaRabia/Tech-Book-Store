import { NavLink, Outlet, Link } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/Logo.svg";
import { ReactComponent as CartImg } from "../assets/cart.svg";

import "./NavFooter.scss";
import Navbar from "./Navbar";
import Footer from "./Footer";

function NavFooter() {
  return (
    <>
      <Navbar />

      <Outlet />

      <Footer />
    </>
  );
}

export default NavFooter;
