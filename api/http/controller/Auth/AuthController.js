const User = require("../../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { createUserResponse } = require("../../responses/Auth/userResponse");
require("dotenv").config();

const authCookieName = "authToken";

exports.index = async (req, res) => {
  console.log("Client.origin: ", process.env.CLIENT_ORIGIN);

  try {
    const token = req.cookies[authCookieName]; // oder req.headers.authorization
    if (!token) {
      return res.status(401).json({ isAuthenticated: false });
    }

    // Token validieren
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log("FALSCHER TOKEN: " + err);
        return res
          .status(401)
          .json({ isAuthenticated: false, error: err.message });
      }

      console.log("HAT GEKLAPPT");
      // Token ist gültig
      res.json({ isAuthenticated: true });
    });
  } catch (error) {
    res.status(500).json({ isAuthenticated: false });
  }
};

exports.login = async (req, res) => {
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
      httpOnly: true, // Wichtig: JavaScript kann nicht darauf zugreifen
      secure: true, // Sollte über HTTPS gesendet werden
      sameSite: "strict", // Verhindert das Senden des Cookies bei Cross-Site-Requests
      // maxAge: ...     // Setzt eine Ablaufzeit für das Cookie
    });

    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json({ message: "Serverfehlerq: " + error.message });
  }
};

exports.logout = async (req, res) => {
  res.cookie(authCookieName, "", {
    httpOnly: true,
    expires: new Date(0), // Setze das Ablaufdatum auf ein vergangenes Datum
  });
  res.status(200).send({ message: "Logout erfolgreich" });
};

exports.register = async (req, res) => {
  const { email, password, first_name, last_name } = req.body;

  // catch validation error
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        errors: { email: "This email is already in use or invalid." },
      });
    }

    hashedPassword = await generateHashedPassword(password);
    const user = new User({
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: hashedPassword,
    });

    await user.save();
    res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ message: "Serverfehler: " + error.message });
  }
};
async function generateHashedPassword(plainPassword) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(plainPassword, salt);
    return hash;
  } catch (error) {
    console.error("Error beim Generieren des Hashes:", error);
    throw error;
  }
}
