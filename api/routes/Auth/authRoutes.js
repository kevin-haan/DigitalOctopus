const express = require("express");
const router = express.Router();
const authController = require("../../http/controller/Auth/AuthController");

router.get("/", authController.index);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/register", authController.register);

module.exports = router;
