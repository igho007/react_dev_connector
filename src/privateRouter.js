import axios from "axios";
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRouter = ({ children }) => {
  const handleRequest = async () => {
    const res = await axios.get("api/user/auth-user");
    const user = res.data.user;
    return user;
  };
  const user = handleRequest();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRouter;
