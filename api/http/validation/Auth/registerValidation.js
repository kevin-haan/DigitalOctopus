const { checkSchema } = require("express-validator");
const User = require("../../../models/User");

const checkEmailNotInUse = async (value) => {
  const existingUser = await User.findOne({ email: value });
  if (existingUser) {
    throw new Error("This Email is invalid or already in use");
  }
  return true;
};

exports.registerValidation = checkSchema({
  email: {
    notEmpty: {
      errorMessage: "Email is required", // Fehlernachricht, wenn das Feld leer ist
    },
    emailNotInUse: {
      custom: checkEmailNotInUse,
      bail: true,
    },
    isEmail: true,
  },
  password: {
    isLength: {
      options: { min: 8 },
      errorMessage: "Password should be at least 8 chars long",
    },
  },
  first_name: {
    notEmpty: {
      errorMessage: "First name is required", // Fehlernachricht, wenn das Feld leer ist
    },
  },
  last_name: {
    notEmpty: {
      errorMessage: "Last name is required", // Fehlernachricht, wenn das Feld leer ist
    },
  },
});
