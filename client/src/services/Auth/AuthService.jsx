/* eslint-disable no-useless-catch */
import axios from "axios";

const checkAuthStatus = async () => {
  try {
    const response = await axios.get("auth");
    return response.status === 200 && response.data.isAuthenticated;
  } catch (error) {
    console.error("Authentifizierungsprüfung fehlgeschlagen", error);
    return false;
  }
};

const login = async (credentials) => {
  try {
    const response = await axios.post("/auth/login", credentials, {});
    return response.status === 200;
  } catch (error) {
    console.error("Login-Fehler", error.message);
    return false;
  }
};

const register = async (registerData) => {
  try {
    const response = await axios.post("/auth/register", registerData);
    return { success: response.status === 200 };
  } catch (error) {
    if (error.response) {
      return { success: false, errors: error.response.data.errors };
    } else {
      return {
        success: false,
        errors: { general: "Ein unbekannter Fehler ist aufgetreten." },
      };
    }
  }
};

const logout = async () => {
  try {
    const response = await axios.post("/auth/logout");
    return response.status === 200;
  } catch (error) {
    console.error("Logout-Fehler", error.message);
    return false;
  }
};

export default {
  checkAuthStatus,
  login,
  logout,
  register,
};
