import React from "react";
import { FaCode, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuthDispatch, useAuthState } from "../../context/authContext";
import { useProfileDispatch } from "../../context/profileContext";
import { CLEAR_PROFILE, LOGOUT } from "../../context/types";
import "./Navbar.scss";

const Navbar = () => {
  const state = useAuthState();
  const dispatch = useAuthDispatch();
  const dispatchProfile = useProfileDispatch();
  let authLink = (
    <ul>
      <li>
        <div className="app__navbar-dot"></div>
        <p className="text-white mr-2">{state.user?.name}</p>
      </li>
      <li>
        <div className="app__navbar-dot"></div>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <div className="app__navbar-dot"></div>
        <FaSignOutAlt style={{ color: "#fff", marginLeft: "10px" }} />
        <a
          href="#!"
          onClick={() => {
            dispatch({ type: LOGOUT });
            dispatchProfile({ type: CLEAR_PROFILE });
          }}
          style={{ marginLeft: "2px" }}
        >
          <span className="hide-sm">logout</span>
        </a>
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
