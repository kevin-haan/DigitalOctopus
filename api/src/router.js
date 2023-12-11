const express = require("express");
const userRoutes = require("../routes/userRoutes");
const authRoutes = require("../routes/Auth/authRoutes");

const router = express.Router();

router.use("/user", userRoutes);
router.use("/auth", authRoutes);

module.exports = router;
