const mongoose = require("mongoose");
const { Schema } = mongoose;

const APISchema = new Schema({
  extraField: String,
});

module.exports = APISchema;
