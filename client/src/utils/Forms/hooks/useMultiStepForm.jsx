import { useState, useCallback } from "react";
import { useGlobalLoadingStatus } from "../../../context/GlobalLoadingStatusContext";
import { useForm } from "./useForm";

export const useMultiStepForm = (form, action, successAction, errorAction) => {
  const {
    inputs,
    errors,
    handleInputChange,
    handleSubmit: handleSubmitBase,
  } = useForm(form, action, successAction, errorAction);
  const [currentStep, setCurrentStep] = useState(1);
  const { startGloballyLoading, stopGloballyLoading } =
    useGlobalLoadingStatus();

  const handleSubmit = () => {
    if (currentStep < form.totalSteps) {
      setCurrentStep(currentStep + 1);
      form.setCurrentStep(currentStep + 1);
    } else {
      startGloballyLoading();
      handleSubmitBase();
      stopGloballyLoading();
    }
  };

  const nextStep = () => {
    if (form.validateCurrentStep(inputs)) {
      setCurrentStep(currentStep + 1);
      form.setCurrentStep(currentStep + 1);
    }
  };

  return {
    inputs,
    errors,
    handleInputChange,
    handleSubmit,
    nextStep,
    currentStep,
  };
};
