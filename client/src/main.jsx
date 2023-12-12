// REACT
import React from "react";
import ReactDOM from "react-dom/client";

// AXIOS
import axios from "axios";

// CSS
import "./resources/scss/main.scss";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";

// AXIOS CONFIG
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
