const User = require("../../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
require("dotenv").config();

const authCookieName = "authToken";

exports.index = async (req, res) => {
  try {
    const token = req.cookies[authCookieName] || req.headers.authorization;
    if (!token) {
      return res.status(401).json({ isAuthenticated: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ isAuthenticated: true });
  } catch (error) {
    res.status(401).json({ isAuthenticated: false, error: error.message });
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (req.recaptcha && req.recaptcha.error) {
    return res.status(401).json({
      errors: [
        { path: "recaptcha", msg: "ReCaptcha-Validierung fehlgeschlagen" },
      ],
    });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Ungültige An2meldedaten" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie(authCookieName, token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json({ message: "Serverfehlerq: " + error.message });
  }
};

exports.logout = async (req, res) => {
  res.cookie(authCookieName, "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: new Date(0), // Setze ein vergangenes Datum
  });
  res.status(200).json({ ok: true });
};

exports.register = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, first_name, last_name } = req.body;

  try {
    const hashedPassword = await generateHashedPassword(password);
    const user = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ message: "Serverfehler: " + error.message });
  }
};
async function generateHashedPassword(plainPassword) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(plainPassword, salt);
  return hash;
}
