const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config();

global.__basedir = path.join(__dirname, "..");

// Middleware
app.use(cookieParser());

const allowedOrigins = [
  process.env.CLIENT_ORIGIN,
  process.env.CLIENT_ORIGIN_ALT,
];
const corsOptions = {
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  allowedHeaders: "Content-Type,Authorization,csrf-token",
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));
app.use(express.json());

// Routen
const router = require("./router");
app.use(router);

const validate = require("../http/middleware/validate");
router.use(validate);

module.exports = app;
