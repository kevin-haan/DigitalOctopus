const express = require("express");
const userRoutes = require("../routes/userRoutes");
const authRoutes = require("../routes/Auth/authRoutes");
const csrfRoutes = require("../routes/csrfRoutes");
const rateLimit = require("express-rate-limit");
const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 15 Minuten
  max: 120, // Limitiere jede IP auf 100 Anfragen pro Fenster
});

router.use("/user", userRoutes);
router.use("/auth", authLimiter, authRoutes);
router.use("/csrf", csrfRoutes);

module.exports = router;
