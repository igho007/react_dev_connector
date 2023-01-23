import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import AlertProvider from "./context/alertContext";
import AuthProvider from "./context/authContext";
import ProifleProvider from "./context/profileContext";
import "./index.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <AuthProvider>
      <AlertProvider>
        <ProifleProvider>
          <App />
        </ProifleProvider>
      </AlertProvider>
    </AuthProvider>
  </StrictMode>
);
