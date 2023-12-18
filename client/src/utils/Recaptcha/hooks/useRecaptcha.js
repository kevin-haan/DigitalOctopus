import { useState, useCallback } from "react";

const useRecaptcha = () => {
  const [recaptchaToken, setRecaptchaToken] = useState("");

  const handleRecaptchaChange = useCallback((token) => {
    setRecaptchaToken(token);
  }, []);

  const resetRecaptcha = useCallback(() => {
    setRecaptchaToken("");
  }, []);

  return {
    recaptchaToken,
    handleRecaptchaChange,
    resetRecaptcha,
  };
};

export default useRecaptcha;
