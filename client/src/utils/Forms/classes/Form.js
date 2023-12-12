import Field from "./Field";
import ValidationRules from "../validationRules";

export class Form {
  constructor(fieldConfigs) {
    this.fields = Object.keys(fieldConfigs).reduce((acc, key) => {
      const [initialValue, rules] = fieldConfigs[key];
      acc[key] = new Field(initialValue, rules);
      return acc;
    }, {});
  }

  getInitialValues() {
    return Object.fromEntries(
      Object.entries(this.fields).map(([key, field]) => [
        key,
        field.initialValue,
      ])
    );
  }

  validateField(name, value, allValues) {
    const fieldRules = this.fields[name].rules;

    return fieldRules
      .map((rule) => {
        const [ruleName, ruleValue] = rule.split(":");
        const ruleMethod = ValidationRules[ruleName];

        if (ruleName === "sameAs") {
          // Für 'sameAs' die aktuellen Werte beider Felder übergeben
          const otherValue = allValues[ruleValue];
          return ruleMethod(value, otherValue);
        }

        return ruleMethod ? ruleMethod(value, ruleValue) : "";
      })
      .find((message) => message);
  }

  validateCurrentStep(inputs) {
    const stepFields = this.steps[this.currentStep];
    let isValid = true;

    for (let fieldName of stepFields) {
      const errorMessage = this.validateField(
        fieldName,
        inputs[fieldName],
        inputs
      );
      if (errorMessage) {
        isValid = false;
        break;
      }
    }

    return isValid;
  }
}

export default Form;
