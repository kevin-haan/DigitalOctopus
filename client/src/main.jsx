// REACT
import React from "react";
import ReactDOM from "react-dom/client";

// CSS
import "./resources/scss/main.scss";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
