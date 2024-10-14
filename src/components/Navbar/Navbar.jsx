import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logoIMG from "../../images/logoIMG.png";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import SearchForm from "../SearchForm/SearchForm";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const handleNavbar = () => setToggleMenu(!toggleMenu);

  return (
    <nav className="navbar" id="navbar">
      <div className="container navbar-content flex">
        <div className="brand-and-toggler flex flex-sb">
          <Link to="/" className="navbar-brand flex">
            <img src={logoIMG} alt="site logo" />
            <span className="text-uppercase fw-7 fs-24 ls-1">
              {" "}
              NavadoBooks{" "}
            </span>
          </Link>
          <button
            type="button"
            className="navbar-toggler-btn"
            onClick={handleNavbar}
          >
            <HiOutlineMenuAlt3
              size={35}
              style={{ color: `${toggleMenu ? "#fff" : "#010101"}` }}
            />
          </button>
        </div>
        <SearchForm />
        <div
          className={
            toggleMenu
              ? "navbar-collapse show-navbar-collapse"
              : "navbar-collapse"
          }
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                to="book"
                className="nav-link text-uppercase text-white fs-22 fw-6 ls-1"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="about"
                className="nav-link text-uppercase text-white fs-22 fw-6 ls-1"
              >
                about
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="login"
                className="nav-link text-uppercase text-white fs-22 fw-6 ls-1"
              >
                <i class="fa-solid fa-user"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="login"
                className="nav-link text-uppercase text-white fs-22 fw-6 ls-1"
              >
                <i class="fa-solid fa-cart-shopping"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
