/* eslint-disable no-useless-catch */
import axios from "axios";

const checkAuthStatus = async () => {
  try {
    const response = await axios.get("auth");
    return response.status === 200;
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
    throw error;
  }
};
const logout = async () => {
  try {
    const response = await axios.post("/auth/logout");
    return response.status === 200;
  } catch (error) {
    throw error;
  }
};

export default {
  checkAuthStatus,
  login,
  logout,
};
