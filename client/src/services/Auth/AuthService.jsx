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
    console.log(registerData);
    const response = await axios.post("/auth/register", registerData);
    console.log(response);
    return response.status === 200;
  } catch (error) {
    console.error("Login-Fehler", error.message);
    return false;
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
