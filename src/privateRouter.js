import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "./context/authContext";

const PrivateRouter = ({ children }) => {
  const { user } = useAuthState();
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRouter;
