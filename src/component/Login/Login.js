import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { useAlertDispatch } from "../../context/alertContext";
import { useAuthDispatch } from "../../context/authContext";
import { LOGIN_SUCCESS, REMOVE_ALERT } from "../../context/types";
import { login } from "../../utils/getResponse";

const Login = () => {
  const [state, setState] = useState({ email: "", password: "" });
  const { email, password } = state;
  const dispatch = useAlertDispatch();
  const authDispatch = useAuthDispatch();
  const navigate = useNavigate();
  const id = v4();
  const handleChange = (e) =>
    setState({ ...state, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    try {
      const res = await login(email, password);
      authDispatch({ type: LOGIN_SUCCESS, payload: res.data?.user });

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      // dispatch({
      //   type: SET_ALERT,
      //   payload: {
      //     id,
      //     msg: "Invalid username/password",
      //     alertType: "danger",
      //   },
      // });

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
