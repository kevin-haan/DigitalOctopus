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
// Aktiviere CSP mit 'helmet'
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"], // Erlaubt Ressourcen von der gleichen Domain
      scriptSrc: ["'self'"], // Erlausbt Inline-Skripte von 'self' und Skripte von einer vertrauenswürdigen CDN
      imgSrc: ["'self'"], // Erlaubt Bilder von 'self' und von einer vertrauenswürdigen Quelle
      styleSrc: ["'self'"], // Erlaubt Inline-Styles von 'self' und Styles von einer vertrauenswürdigen CDN
    },
  })
);
app.use(helmet());
app.use(morgan("combined"));

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
app.use(router);

const validate = require("../http/middleware/validate");
router.use(validate);

module.exports = app;
