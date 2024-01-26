const express = require("express");
const router = express.Router();
const BackendController = require("../../http/controller/Designer/BackendController");
const FrontendController = require("../../http/controller/Designer/FrontendController");
const CSSFrameworkController = require("../../http/controller/Designer/CSSFrameworkController");
const DatabaseController = require("../../http/controller/Designer/DatabaseController");
const CICDPipelineController = require("../../http/controller/Designer/CICDPipelineController");
const DesignerController = require("../../http/controller/Designer/DesignerController");

// router.get('/', userController.index);
router.post("/", DesignerController.handleSelection);
router.get("/backend", BackendController.index);
router.get("/frontend", FrontendController.index);
router.get("/cssFramework", CSSFrameworkController.index);
router.get("/database", DatabaseController.index);
router.get("/cicdPipeline", CICDPipelineController.index);
module.exports = router;
