import { motion } from "framer-motion";
import React from "react";

import { Link, Navigate } from "react-router-dom";
import { useAuthState } from "../../context/authContext";
import "./Landing.scss";

const Landing = () => {
  const { user } = useAuthState();

  console.log(user);
  if (user) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <motion.div transition={{ duration: 0.5 }} className="app__landing">
      <div className="app__landing-overlay">
        <div className="app__landing-inner">
          <h1 className="x-large">Developer Connector</h1>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>

          <motion.div
            whileInView={{ x: [-100, 0] }}
            transition={{ duration: 0.4 }}
            className="app__landing-buttons"
          >
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-secondary">
              Login
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Landing;
