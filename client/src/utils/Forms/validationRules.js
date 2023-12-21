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

  static sameAs(value, otherValue) {
    return value === otherValue ? "" : "Passwörter stimmen nicht überein";
  }

  // Weitere Validierungsmethoden können hier hinzugefügt werden...
}

export default ValidationRules;
