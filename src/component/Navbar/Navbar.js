import React from "react";
import { FaCode } from "react-icons/fa";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <nav className="app__navbar bg-dark">
      <h1>
        <a href="index.html">
          <FaCode /> DevConnector
        </a>
      </h1>

      <ul>
        <li>
          <div className="app__navbar-dot"></div>
          <a href="profiles.html">Developers</a>
        </li>
        <li>
          <div className="app__navbar-dot"></div>
          <a href="register.html">Register</a>
        </li>
        <li>
          <div className="app__navbar-dot"></div>
          <a href="login.html">Login</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
