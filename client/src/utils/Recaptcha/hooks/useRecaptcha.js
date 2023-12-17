import { useState, useCallback } from "react";

export const useRecaptcha = (siteKey) => {
  const [recaptchaValue, setRecaptchaValue] = useState(null);

  const handleRecaptchaChange = useCallback((value) => {
    setRecaptchaValue(value);
  }, []);

  return { recaptchaValue, handleRecaptchaChange };
};
