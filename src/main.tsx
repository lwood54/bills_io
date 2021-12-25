import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./contexts/Auth";
import { PATH } from "./constants/nav";
import { Signup } from "./components/Nav/signup";

ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById("root")
);
