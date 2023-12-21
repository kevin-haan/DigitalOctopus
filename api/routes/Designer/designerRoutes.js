const express = require("express");
const router = express.Router();
const apiController = require("../../http/controller/Designer/ApiController");
const clientController = require("../../http/controller/Designer/ClientController");
const cssFrameworkController = require("../../http/controller/Designer/CssFrameworkController");
const databaseController = require("../../http/controller/Designer/DatabaseController");
const databaseDatacontroller = require("../../http/controller/Designer/DesignerDataController");

// router.get('/', userController.index);
router.get("/api", apiController.index);
router.get("/client", clientController.index);
router.get("/cssFramework", cssFrameworkController.index);
router.get("/database", databaseController.index);
module.exports = router;
