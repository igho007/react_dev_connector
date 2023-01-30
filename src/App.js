import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Alert,
  CreateProfile,
  Dashboard,
  Landing,
  Login,
  Navbar,
  Register,
} from "./component";
import PrivateRouter from "./privateRouter";

import "./App.scss";
import { setAuthToken } from "./utils/setAuthToken";

const App = () => {
  useEffect(() => {
    console.log(123);
    setAuthToken(localStorage.getItem("token"));
  }, []);
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <section>
          <Alert />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRouter>
                  <Dashboard />
                </PrivateRouter>
              }
            />
            <Route
              path="/create-profile"
              element={
                <PrivateRouter>
                  <CreateProfile />
                </PrivateRouter>
              }
            />
          </Routes>
        </section>
      </div>
    </BrowserRouter>
  );
};

export default App;
