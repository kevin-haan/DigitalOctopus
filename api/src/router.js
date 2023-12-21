const express = require("express");
const userRoutes = require("../routes/userRoutes");
const authRoutes = require("../routes/Auth/authRoutes");
const csrfRoutes = require("../routes/csrfRoutes");
const designerRoutes = require("../routes/Designer/designerRoutes");
const rateLimit = require("express-rate-limit");
const { default: validate } = require("../http/middleware/validate");
const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 15 Minuten
  max: 120, // Limitiessdre jede IP auf 100 Anfragen pro Fensterasd
});

router.use("/user", userRoutes);
router.use("/auth", authLimiter, authRoutes);
router.use("/csrf", csrfRoutes);
router.use("/designer", designerRoutes);

module.exports = router;
