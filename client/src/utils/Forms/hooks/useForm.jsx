import { useState, useCallback } from "react";
import { useGlobalLoadingStatus } from "../../../context/GlobalLoadingStatusContext";

export const useForm = (form, action, successAction, errorAction) => {
  const [inputs, setInputs] = useState(form.getInitialValues());
  const [errors, setErrors] = useState({});
  const { startGloballyLoading, stopGloballyLoading } =
    useGlobalLoadingStatus();

  const handleInputChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      setInputs((inputs) => ({ ...inputs, [name]: value }));
      setErrors((errors) => ({
        ...errors,
        [name]: form.validateField(name, value, inputs),
      }));
    },
    [form, inputs]
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (Object.values(errors).every((error) => !error)) {
      startGloballyLoading();
      try {
        await action(inputs);
      } finally {
        stopGloballyLoading();
      }
    }
  };

  return { inputs, errors, handleInputChange, handleSubmit };
};
