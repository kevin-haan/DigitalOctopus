const { API } = require("../../../models/Designer/DesignerBaseModel");
const DesignerDataController = require("./DesignerDataController");
class ApiController extends DesignerDataController {
  constructor() {
    super(API);
  }
}

module.exports = new ApiController();
