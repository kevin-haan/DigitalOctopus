// MultiStepForm.js
import { Form } from "./Form";

export class MultiStepForm extends Form {
  constructor(fieldConfigs, steps) {
    super(fieldConfigs);
    this.steps = steps;
    this.currentStep = 1;
    this.totalSteps = Object.keys(steps).length;
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

  setCurrentStep(stepNumber) {
    this.currentStep = stepNumber;
  }
}
