const { CssFramework } = require("../../../models/Designer/DesignerBaseModel");
const DesignerDataController = require("./DesignerDataController");

class CssFrameworkController extends DesignerDataController {
  constructor() {
    super(CssFramework);
  }
}

module.exports = new CssFrameworkController();
