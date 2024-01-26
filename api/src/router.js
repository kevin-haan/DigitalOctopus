const express = require("express");
const userRoutes = require("../routes/userRoutes");
const authRoutes = require("../routes/Auth/authRoutes");
const csrfRoutes = require("../routes/csrfRoutes");
const designerRoutes = require("../routes/Designer/designerRoutes");
const adminRoutes = require("../routes/Admin/adminRoutes");
const rateLimit = require("express-rate-limit");
const path = require("path");
const helmet = require("helmet");
const { default: validate } = require("../http/middleware/validate");
const router = express.Router();
const winston = require("winston");

require("dotenv").config();

router.use(helmet());

const logger = winston.createLogger({
  level: "error",
  transports: [
    new winston.transports.Console(),
  ],
});

router.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://trusted.cdn.com"],
      imgSrc: ["'self'", process.env.API_BASE_URL, "data:"],
      styleSrc: ["'self'", "https://trusted.cdn.com"],
    },
  })
);

router.use(function (req, res, next) {
  const clientOrigin = process.env.CLIENT_ORIGIN;
  const clientOriginAlt = process.env.CLIENT_ORIGIN_ALT;
  const apiBaseUrl = process.env.API_BASE_URL;

  const apiPath = new URL(apiBaseUrl).pathname;
  const clientPaths = [
    new URL(clientOrigin).pathname,
    new URL(clientOriginAlt).pathname,
  ];

  console.log("apiBaseUrl", apiBaseUrl);
  console.log("apiPath", apiPath);
  console.log("req.path.startsWith(apiPath)", req.path.startsWith(apiPath));

  if (
    req.path.startsWith(apiPath) ||
    clientPaths.some((path) => req.path.startsWith(path))
  ) {
    res.header("Cross-Origin-Resource-Policy", "cross-origin");
  }

  next();
});

const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 120,
});

router.use("/user", userRoutes);
router.use("/auth", authLimiter, authRoutes);
router.use("/csrf", csrfRoutes);
router.use("/designer", designerRoutes);
router.use("/admin", adminRoutes);
router.use(
  "/public/uploads",
  express.static(path.join(__dirname, "..", "public", "uploads"))
);

router.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send("error");
  logger.error(
    `Error: ${err.message}\nStack: ${err.stack}\nRequest: ${req.method} ${req.originalUrl}`
  );
  console.error(err);
});
module.exports = router;
