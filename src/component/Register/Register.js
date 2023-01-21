import React, { useState } from "react";
import { FaUsers } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { useAlertDispatch } from "../../context/alertContext";
import { useAuthDispatch, useAuthState } from "../../context/authContext";
import { REGISTER_SUCCESS, REMOVE_ALERT, SET_ALERT } from "../../context/types";
import { register } from "../../utils/getResponse";

import "./Register.scss";

const Register = () => {
  const dispatch = useAuthDispatch();
  const { isAuthenticated } = useAuthState();
  const navigate = useNavigate();
  const alertDispatch = useAlertDispatch();
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = state;
  const id = v4();

  const handleChange = (e) =>
    setState({ ...state, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register(name, email, password, confirmPassword);
      dispatch({ type: REGISTER_SUCCESS, payload: res.data.user });
      if (isAuthenticated) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error.response.data);
      error.response.data.errors.forEach((e) => {
        alertDispatch({
          type: SET_ALERT,
          payload: { id, msg: e.msg, alertType: "danger" },
        });
        setTimeout(
          () => alertDispatch({ type: REMOVE_ALERT, payload: id }),
          5000
        );
      });
    }
  };
  return (
    <div className="app__register app__container">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <FaUsers /> Create Your Account
      </p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => handleChange(e)}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => handleChange(e)}
            minLength="6"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => handleChange(e)}
            minLength="6"
          />
        </div>
        <input
          type="submit"
          id="app__register-button"
          className="btn btn-primary"
          value="Register"
        />
      </form>
      <p className="my-1">
        Already have an account?{" "}
        <Link to="/login" id="link" className="btn btn-secondary">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default Register;
