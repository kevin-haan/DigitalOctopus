import { useState, useCallback, useEffect } from "react";
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

    const newErrors = {};
    for (const key of Object.keys(inputs)) {
      newErrors[key] = form.validateField(key, inputs[key], inputs);
    }

    setErrors(newErrors);

    const hasClientSideErrors = Object.values(newErrors).some(Boolean);
    if (!hasClientSideErrors) {
      startGloballyLoading();
      try {
        const response = await action(inputs);
        console.log(response);

        if (response && response.success) {
          successAction(response);
        }

        if (response && response.errors) {
          const serverErrors = convertServerErrors(response.errors);
          setErrors((prevErrors) => ({ ...prevErrors, ...serverErrors }));
          errorAction(serverErrors);
        }
      } finally {
        stopGloballyLoading();
      }
    }
  };

  const convertServerErrors = (serverErrors) => {
    return serverErrors.reduce((convertedErrors, error) => {
      convertedErrors[error.path] = error.msg;
      return convertedErrors;
    }, {});
  };

  return {
    inputs,
    errors,
    handleInputChange,
    handleSubmit,
  };
};
