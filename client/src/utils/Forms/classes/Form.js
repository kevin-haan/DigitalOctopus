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
  validateField(name, value) {
    const fieldRules = this.fields[name].rules;

    return fieldRules
      .map((rule) => {
        const [ruleName, ruleValue] = rule.split(":");
        const ruleMethod = ValidationRules[ruleName];
        return ruleMethod ? ruleMethod(value, ruleValue) : "";
      })
      .find((message) => message);
  }
}

export default Form;
