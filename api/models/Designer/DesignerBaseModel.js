const mongoose = require("mongoose");
const { Schema } = mongoose;
const APISchema = require("./APISchema");
const ClientSchema = require("./ClientSchema");
const DatabaseSchema = require("./DatabaseSchema");
const CssFrameworkSchema = require("./CssFrameworkSchema");

const DesignerBaseModelSchema = new Schema(
  {
    name: String,
    description: String,
  },
  { discriminatorKey: "type" }
);

const DesignerBaseModel = mongoose.model(
  "DesignerBaseModel",
  DesignerBaseModelSchema
);

const API = DesignerBaseModel.discriminator("API", APISchema, "api");
const Client = DesignerBaseModel.discriminator(
  "Client",
  ClientSchema,
  "client"
);
const Database = DesignerBaseModel.discriminator(
  "Database",
  DatabaseSchema,
  "database"
);
const CssFramework = DesignerBaseModel.discriminator(
  "CssFramework",
  CssFrameworkSchema,
  "cssFramework"
);

module.exports = {
  API,
  Client,
  Database,
  CssFramework,
};
