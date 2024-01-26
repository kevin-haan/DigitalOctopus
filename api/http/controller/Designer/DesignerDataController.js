const {
  createDesignerDataResponse,
} = require("../../responses/Designer/designerDataResponse");

class DesignerDataController {
  constructor(model) {
    this.model = model;
  }

  index = async (req, res) => {
    try {
      const availableItems = await this.model.find();

      if (!availableItems || availableItems.length === 0) {
        return res
          .status(404)
          .json({ message: `${this.model.modelName} nicht gefunden` });
      }

      availableItems.map((item) => {
        item.name === "Laravel"
          ? (item.options = { jetstream: false, breeze: false })
          : "";
      });

      const response = {
        items: availableItems.map((item) => createDesignerDataResponse(item)),
      };

      res.json(response);
    } catch (error) {
      res.status(500).json({ message: "ServerfehlerDataController: " + error });
    }
  };
}

module.exports = DesignerDataController;
