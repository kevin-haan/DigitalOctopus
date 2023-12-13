const express = require("express");
const userRoutes = require("../routes/userRoutes");
const authRoutes = require("../routes/Auth/authRoutes");
const rateLimit = require("express-rate-limit");

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 15 Minuten
  max: 20, // Limitiere jede IP auf 100 Anfragen pro Fenster
});

const csrfProtection = csurf({ cookie: true });

router.use("/user", userRoutes);
router.use("/auth", authLimiter, csrfProtection, authRoutes);

module.exports = router;
