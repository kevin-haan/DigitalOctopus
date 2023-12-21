const axios = require("axios");

app.post("/validate-recaptcha", async (req, res) => {
  const response = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_TOKEN}&response=${req.body.recaptchaToken}`
  );
  res.send(response.data.success);
});
