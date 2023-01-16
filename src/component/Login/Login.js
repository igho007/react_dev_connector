import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import { useAlertDispatch } from "../../context/alertContext";
import { REMOVE_ALERT, SET_ALERT } from "../../context/types";

const Login = () => {
  const [state, setState] = useState({ email: "", password: "" });
  const { email, password } = state;
  const dispatch = useAlertDispatch();
  const id = Math.floor(Math.random() * 10000);
  const handleChange = (e) =>
    setState({ ...state, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/api/user/login",
        JSON.stringify({ email, password }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
      dispatch({
        type: SET_ALERT,
        payload: {
          id: Math.floor(Math.random() * 10000),
          msg: res.data.msg,
          alertType: "success",
        },
      });
    } catch (error) {
      console.log(error.response.data);
      dispatch({
        type: SET_ALERT,
        payload: {
          id,
          msg: error.response?.data.msg,
          alertType: "danger",
        },
      });

      setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 3000);
    }
  };
  return (
    <div className="app_container app__register">
      <p className="lead">
        <FaUser /> Login
      </p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <input
          type="submit"
          id="app__register-button"
          className="btn btn-secondary"
          value="Login"
        />
      </form>
      <p className="my-1">
        Don't have an account?{" "}
        <Link to="/register" id="link" className="btn btn-primary">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
