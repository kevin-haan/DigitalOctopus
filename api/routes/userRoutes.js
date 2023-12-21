const express = require("express");
const router = express.Router();
const userController = require("../http/controller/UserController");

// router.get('/', userController.index);
router.get("/", userController.index);
module.exports = router;
