import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { useGlobalLoadingStatus } from "../../../context/GlobalLoadingStatusContext";

export const useForm = (form, action, successAction, errorAction) => {
  const initialValues = Object.keys(form.fields).reduce((acc, key) => {
    acc[key] = form.fields[key].initialValue;
    return acc;
  }, {});

  const [inputs, setInputs] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const { startGloballyLoading, stopGloballyLoading } =
    useGlobalLoadingStatus();

  const handleInputChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      setInputs({ ...inputs, [name]: value });

      const errorMessage = form.validateField(name, value);
      setErrors({ ...errors, [name]: errorMessage });
    },
    [inputs, form, errors]
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (checkForErrors()) {
      toast("Formular enthält Fehler.");
      return;
    }
    startGloballyLoading();
    try {
      const response = await action(inputs);
      if (response && successAction) successAction(response);
    } catch (error) {
      if (error && errorAction) errorAction(error);
    } finally {
      stopGloballyLoading();
    }
  };

  const checkForErrors = () => {
    return Object.values(errors).some((error) => error);
  };

  return {
    inputs,
    errors,
    handleInputChange,
    handleSubmit,
  };
};
