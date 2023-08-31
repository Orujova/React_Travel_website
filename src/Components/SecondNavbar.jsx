import logo from "../icons/logo.svg";
import plane from "../icons/plane.svg";
import bed from "../icons/bed.svg";
import blackheart from "../icons/blackheart.svg";
import footerlogo from "../icons/footerlogo.svg"
import johndayi from "../assets/images/JohnCircle.png";
import { AiOutlineBars } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import { RiShoppingCart2Line } from "react-icons/ri";
import React, { useRef, useState, useEffect } from "react";
const SecondNavbar = ({ basketHotelBuy, basketTicketBuy }) => {
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

  return (
   
     <div className="container__full">
    <header className="flight-search-navbar">
   
      <nav className="nav_links">
        <ul>
          <li>
            <NavLink className="nav_link" to="/flight-search">
              {" "}
              <img src={plane} alt="" /> Find Flight
            </NavLink>
          </li>
          <li>
            <NavLink className="nav_link" to="/hotel-search">
              <img src={bed} alt="" /> Find Stays
            </NavLink>
          </li>
          <li>
            <NavLink className="nav_link" to="/about">
              About
            </NavLink>
          </li>
          <li>
            <NavLink className="nav_link" to="/blogs">
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink className="nav_link" to="/contact">
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="logo">
      <AiOutlineBars className="menu_bar" onClick={openOverlayMenu} />
        <img src={logo} alt="" />
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
            <Link to="/about">Blog</Link>
          </li>
          <li>
            <Link to="/about">Contact</Link>
          </li>
          <li>
            <Link to="/favourites">Favourites</Link>
          </li>
        </ul>
      </div>

      <div className="john__btns">
        
        <h3 className="favourites_link">
          <img src={blackheart} alt="" />
          <NavLink className="nav_link" to="/favourites">
            Favourites
          </NavLink>
        </h3>
        <h3>|</h3>
        <NavLink className="account_icon_nav" to="/account-flow">
          <div className="shop_count">
            <RiShoppingCart2Line className="shop_icon" />
            <span>{basketHotelBuy.length + basketTicketBuy.length}</span>
          </div>
        </NavLink>
        <img className="john__image" src={johndayi} alt="" />
        <h3>John D.</h3>
      </div>
     
    </header>
    </div>
  
  );
};
const t = (a) => a;
export default connect(t)(SecondNavbar);
