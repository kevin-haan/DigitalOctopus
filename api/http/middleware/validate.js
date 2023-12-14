const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
  // Überprüfen, ob Validierungsregeln angewendet wurden
  if (!req._validationErrors) {
    return next(); // Keine Validierungsregeln, fahre mit der nächsten Middleware fort
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Es gibt Validierungsfehler
    return res.status(400).json({ errors: errors.array() });
  }

  next(); // Keine Fehler, fahre mit der nächsten Middleware fort
};

module.exports = validate;
