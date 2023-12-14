const express = require("express");
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config();

// Middleware
app.use(cookieParser());
app.use(helmet());
app.use(morgan("combined"));

console.log("Client.origin: ", process.env.CLIENT_ORIGIN);
const allowedOrigins = [process.env.CLIENT_ORIGIN]; //test
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// Routen
const router = require("./router");
const validate = require("../http/middleware/validate");
// define the home page route
app.use(router);

// Error-Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
router.use(validate);

module.exports = app; // Exportiere die Express-App
