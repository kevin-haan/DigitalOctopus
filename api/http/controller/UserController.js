const User = require("../../models/User");
const { createUserResponse } = require("../responses/Auth/userResponse");
const jwt = require("jsonwebtoken");

exports.index = async (req, res) => {
  try {
    const token = req.cookies.authToken;
    if (!token) {
      return res.status(401).json({ message: "Nicht authentifiziert" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "Benutzer nicht gefunden" });
    }

    const userResponse = createUserResponse(user);
    res.json(userResponse);
  } catch (error) {
    res.status(500).json({ message: "Serverfehler: " + error.message });
  }
};
