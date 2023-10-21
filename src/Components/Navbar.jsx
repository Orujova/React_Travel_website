import React, { useRef, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineBars } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import logo from "../icons/logo.svg";
import footerlogo from "../icons/footerLogo.svg";
import whiteLogo from "../icons/whiteLogo.svg";
import plane from "../icons/plane.svg";
import bed from "../icons/bed.svg";
import whiteBed from "../icons/whiteBed.svg";
import whitePlane from "../icons/whitePlane.svg";
const Navbar = () => {
  const overlayMenuRef = useRef();
  function openOverlayMenu(e) {
    if (e.target.classList.contains("menu_bar")) {
      overlayMenuRef.current.classList.add("menu-active");
    }
  }
  function closeOverlayMenu(e) {
    if (e.target.classList.contains("menu_close")) {
      overlayMenuRef.current.classList.remove("menu-active");
    }
  }

  // const [modalShown, setModalShown] = useState(false);

  const [navColor, setnavColor] = useState("transparent");
  const [navlinkColor, setNavlinkColor] = useState("black");
  const [buttonColor, setButtonColor] = useState("white");
  const [logos, setLogos] = useState(false);
  const listenScrollEvent = () => {
    window.scrollY > 10 ? setnavColor(" #fff") : setnavColor("transparent");
    window.scrollY > 10 ? setNavlinkColor("#fff") : setNavlinkColor("#000");
    window.scrollY > 10 ? setButtonColor("#000") : setButtonColor("#fff");
    window.scrollY > 10 ? setLogos(!logos) : setLogos(logos);
  };
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);

  return (
   
    <header
      style={{
        backgroundColor: navColor,
        transition: "all .5s",
      }}
      className="flight-search-navbar"
    >
      <nav className="nav_links">
        <ul>
          <li>
            <NavLink
              style={{
                transition: "all .5s",
                color: buttonColor,
              }}
              className="nav_link"
              to="/flight-search"
            >
              {!logos ? (
                <img src={whitePlane} alt="" />
              ) : (
                <img src={plane} alt="" />
              )}
              Find Flight
            </NavLink>
          </li>
          <li>
            <NavLink
              style={{
                transition: "all .5s",
                color: buttonColor,
              }}
              className="nav_link"
              to="/hotel-search"
            >
              {!logos ? (
                <img src={whiteBed} alt="" />
              ) : (
                <img src={bed} alt="" />
              )}{" "}
              Find Stays
            </NavLink>
          </li>
          <li>
            <NavLink
              style={{
                transition: "all .5s",
                color: buttonColor,
              }}
              className="nav_link"
              to="/about"
            >
             
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              style={{
                transition: "all .5s",
                color: buttonColor,
              }}
              className="nav_link"
              to="/blogs"
            >
             
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink
              style={{
                transition: "all .5s",
                color: buttonColor,
              }}
              className="nav_link"
              to="/contact"
            >
             
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="logo">
        {!logos ? <img src={whiteLogo} alt="" /> : <img src={logo} alt="" />}
      </div>
      <div className="overlay_menu" ref={overlayMenuRef}>
      <RxCross2 onClick={closeOverlayMenu} className="menu_close" />
        <img src={footerlogo} alt="" />
        <ul>
          <li>
            <Link to="/flight-search">Find Flight</Link>
          </li>
          <li>
            <Link to="/hotel-search">Find Stays</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Blog</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link
              style={{
                transition: "all .5s",
                // color: buttonColor,
              }}
              to="/login"
            >
              Login
            </Link>
          </li>
          <li>
            <Link to="/sign-up">Sign Up</Link>
          </li>
        </ul>
      </div>
      <AiOutlineBars
        style={{
          transition: "all .5s",
          color: buttonColor,
        }}
        className="menu_bar"
        onClick={openOverlayMenu}
      />
      <div className="login-btns-navbar">
        <Link
          style={{
            color: buttonColor,
          }}
          to="/login"
        >
          Login
        </Link>
        <Link
          style={{
            color: navlinkColor,
            backgroundColor: buttonColor,
          }}
          to="/sign-up"
        >
          Sign up
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
