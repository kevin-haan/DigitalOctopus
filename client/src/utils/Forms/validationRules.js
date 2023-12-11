class ValidationRules {
  static required(value) {
    return !value ? "Dieses Feld ist erforderlich" : "";
  }

  static minLength(value, min) {
    return value.length < min ? `Mindestens ${min} Zeichen erforderlich` : "";
  }

  static isString(value) {
    return typeof value !== "string" ? "Muss ein String sein" : "";
  }

  // Weitere Validierungsmethoden können hier hinzugefügt werden...
}

export default ValidationRules;
