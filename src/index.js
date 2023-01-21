import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import AlertProvider from "./context/alertContext";
import AuthProvider from "./context/authContext";
import "./index.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <AuthProvider>
      <AlertProvider>
        <App />
      </AlertProvider>
    </AuthProvider>
  </StrictMode>
);
