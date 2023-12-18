import { useState, useCallback, useEffect } from "react";
import { useGlobalLoadingStatus } from "../../../context/GlobalLoadingStatusContext";

export const useForm = (form, action, successAction, errorAction) => {
  const [inputs, setInputs] = useState(form.getInitialValues());
  const [errors, setErrors] = useState({});
  const { startGloballyLoading, stopGloballyLoading } =
    useGlobalLoadingStatus();
  useEffect(() => {
    console.log("Aktualisierte Fehler: ", errors);
  }, [errors]);

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

    // Sammle neue Fehler basierend auf der aktuellen Eingabe
    const newErrors = Object.keys(inputs).reduce((acc, key) => {
      acc[key] = form.validateField(key, inputs[key], inputs);
      return acc;
    }, {});

    // Setze die neuen Fehler in den State
    setErrors(newErrors);

    const hasClientSideErrors = Object.values(newErrors).some((error) => error);
    if (!hasClientSideErrors) {
      startGloballyLoading();
      try {
        const response = await action(inputs);
        console.log(action);
        // Prüfen, ob serverseitige Fehler vorhanden sind
        if (response && response.success) {
          successAction(response);
        }
        if (response && response.errors) {
          const serverErrors = convertServerErrors(response.errors);
          console.log("resp", response.errors);

          setErrors((prevErrors) => ({ ...prevErrors, ...serverErrors }));

          errorAction(serverErrors);
          // Serverseitige Fehler in die State integrieren
        }
      } finally {
        stopGloballyLoading();
      }
    }
  };

  const convertServerErrors = (serverErrors) => {
    const convertedErrors = {};

    serverErrors.forEach((error) => {
      // Angenommen, 'type' ist der Schlüssel des Feldes, zu dem der Fehler gehört
      convertedErrors[error.path] = error.msg;
    });

    return convertedErrors;
  };

  return {
    inputs,
    errors,
    handleInputChange,
    handleSubmit,
  };
};
