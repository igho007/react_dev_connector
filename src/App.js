import React from "react";
import { Alert, Landing, Login, Navbar, Register } from "./component";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.scss";
import AlertProvider from "./context/alertContext";

const App = () => {
  return (
    <BrowserRouter>
      <AlertProvider>
        <div className="app">
          <Navbar />
          <Alert />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </AlertProvider>
    </BrowserRouter>
  );
};

export default App;
