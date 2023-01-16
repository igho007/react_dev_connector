import React from "react";
import { FaCode } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <nav className="app__navbar bg-dark">
      <h1>
        <Link to="/">
          <FaCode /> DevConnector
        </Link>
      </h1>

      <ul>
        <li>
          <div className="app__navbar-dot"></div>
          <Link to="/">Developers</Link>
        </li>
        <li>
          <div className="app__navbar-dot"></div>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <div className="app__navbar-dot"></div>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
