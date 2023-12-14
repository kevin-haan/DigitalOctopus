const handleErrorResponse = (error) => {
  if (error.response) {
    return { success: false, errors: error.response.data.errors };
  } else {
    return {
      success: false,
      errors: { general: "Ein unbekannter Fehler ist aufgetreten." },
    };
  }
};

export { handleErrorResponse };
