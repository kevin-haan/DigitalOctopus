const express = require("express");
const router = express.Router();
const authController = require("../../http/controller/Auth/AuthController");
const csrf = require("csurf");

const csrfProtection = csrf({ cookie: true });

router.get("/", authController.index);
router.post("/login", csrfProtection, authController.login);
router.post("/logout", csrfProtection, authController.logout);
router.post("/register", csrfProtection, authController.register);

module.exports = router;
