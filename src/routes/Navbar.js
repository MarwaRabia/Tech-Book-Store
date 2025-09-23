import { NavLink, Link } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/Logo.svg";
import { ReactComponent as CartImg } from "../assets/cart.svg";
import { auth } from "../services/firebase.js";
import { useEffect, useState, useRef } from "react";
import { signOut } from "firebase/auth";
import { useCart } from "../context/CartContext";
import MiniCart from "../components/Cart/MiniCart";
import "./SCSS/navbar.scss";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  // const [showIcon, setShowIcon] = useState(false);

  const cartRef = useRef();
  const logoutRef = useRef();
  // const iconRef = useRef();

  //  Close cart or logout when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setOpen(false);
      }
      if (logoutRef.current && !logoutRef.current.contains(e.target)) {
        setShowLogout(false);
      }
      // if (iconRef.current && !iconRef.current.contains(e.target)) {
      //   setMenuOpen(false);
      // }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  //  Watch Firebase auth
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    toast.success("Logged out!");
    setShowLogout((prev) => !prev);
    await signOut(auth);

    navigate("/");
  };

  return (
    <div className="app-nav-bar">
      <Toaster />
      <Link to="/" className="logo-container">
        <Logo className="logo" />
      </Link>

      {/* <div className="menu"> */}
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          ☰
                  {totalItems > 0 && <span className="cart-counter-menu">{totalItems}</span>}

        </button>
      {/* </div> */}

      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <div className="left-side-link">
          <NavLink
            to="/"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/contact-us"
            className="nav-link"
            onClick={() => setMenuOpen(false)}
          >
            Contact us
          </NavLink>
        </div>

        <div className="right-side-link">
          <div className="cart-wrapper" ref={cartRef}>
            <button
              onClick={() => setOpen((s) => !s)}
              className="nav-link cart-btn"
            >
              <CartImg />
              {totalItems > 0 && (
                <span className="cart-counter">{totalItems}</span>
              )}
            </button>
            {open && <MiniCart onClose={() => setOpen(false)} />}
          </div>

          {currentUser ? (
            <div className="user-section" ref={logoutRef}>
              <span
                className="nav-link username"
                onClick={() => setShowLogout((prev) => !prev)}
              >
                Hello, {currentUser.displayName || currentUser.email}
              </span>
              {showLogout && (
                <div className="logout">
                  <button className="logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <NavLink
              to="/sign-in"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              Sign up / login
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
