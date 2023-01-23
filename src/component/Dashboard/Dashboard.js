import React from "react";
import { useAuthState } from "../../context/authContext";

const Dashboard = () => {
  const state = useAuthState();
  console.log(state);
  return <div className="app__container">Dashboard</div>;
};

export default Dashboard;
