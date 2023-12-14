const express = require("express");
const router = express.Router();
const authController = require("../../http/controller/Auth/AuthController");
const {
  loginValidation,
} = require("../../http/validation/Auth/loginValidation");
const {
  registerValidation,
} = require("../../http/validation/Auth/registerValidation");
const csrf = require("csurf");

const csrfProtection = csrf({ cookie: true });
router.get("/", authController.index);

router.post("/login", csrfProtection, loginValidation, authController.login);
router.post("/logout", csrfProtection, authController.logout);
router.post(
  "/register",
  csrfProtection,
  registerValidation,
  authController.register
);

module.exports = router;
