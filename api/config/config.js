const fs = require("fs");
const dotenv = require("dotenv");

const envConfig = dotenv.parse(fs.readFileSync(".env.example"));

module.exports = envConfig;

module.exports = {
  allowedOrigins: [
    process.env.CLIENT_ORIGIN,
  ],
};
