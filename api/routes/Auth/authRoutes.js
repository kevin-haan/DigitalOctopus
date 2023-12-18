const Recaptcha = require("express-recaptcha").RecaptchaV3;

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

const recaptcha = new Recaptcha(process.env.SITE_KEY, process.env.SECRET_KEY);

router.get("/", authController.index);
router.post(
  "/login",
  csrfProtection,
  recaptcha.middleware.verify,
  loginValidation,
  authController.login
);
router.post(
  "/register",
  csrfProtection,
  recaptcha.middleware.verify,
  registerValidation,
  authController.register
);
router.post("/logout", csrfProtection, authController.logout);

module.exports = router;
