import React from "react";
import { FaCode } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuthDispatch, useAuthState } from "../../context/authContext";
import { LOGOUT } from "../../context/types";
import "./Navbar.scss";

const Navbar = () => {
  const state = useAuthState();
  const dispatch = useAuthDispatch();
  let authLink = (
    <ul>
      <li>
        <div className="app__navbar-dot"></div>
        <p className="text-white mr-2">{state.user?.name}</p>
      </li>
      <li>
        <div className="app__navbar-dot"></div>
        <Link to="/" onClick={() => dispatch({ type: LOGOUT })}>
          logout
        </Link>
      </li>
    </ul>
  );

  let guestLink = (
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
  );
  return (
    <nav className="app__navbar bg-dark">
      <h1>
        <Link to="/">
          <FaCode /> DevConnector
        </Link>
      </h1>
      {state.user ? authLink : guestLink}
    </nav>
  );
};

export default Navbar;
