const { Client } = require("../../../models/Designer/DesignerBaseModel");
const DesignerDataController = require("./DesignerDataController");

class ClientController extends DesignerDataController {
  constructor() {
    super(Client);
  }
}

module.exports = new ClientController();
