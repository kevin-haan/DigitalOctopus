const { checkSchema } = require("express-validator");

exports.loginValidation = checkSchema({
  email: {
    errorMessage: "Invalid username",
    isEmail: true,
  },
  password: {
    isLength: {
      options: { min: 8 },
      errorMessage: "Password should be at least 8 chars long",
    },
  },
});
