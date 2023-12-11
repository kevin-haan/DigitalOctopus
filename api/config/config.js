const fs = require("fs");
const dotenv = require("dotenv");

// Lese die .env-Datei
const envConfig = dotenv.parse(fs.readFileSync(".env"));

// Exportiere die Konfiguration
module.exports = envConfig;
