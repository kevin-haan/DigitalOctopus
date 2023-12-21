const { Database } = require("../../../models/Designer/DesignerBaseModel");
const DesignerDataController = require("./DesignerDataController");

class DatabaseController extends DesignerDataController {
  constructor() {
    super(Database);
  }
}

module.exports = new DatabaseController();
