/* eslint-disable no-useless-catch */
import axios from "../../config/axiosConfig";
import { handleErrorResponse } from "../../utils/serviceUtils";
const checkAuthStatus = async () => {
  try {
    const response = await axios.get("auth");
    return { success: response.status === 200 };
  } catch (error) {
    return false;
  }
};

const login = async (credentials) => {
  try {
    const response = await axios.post("/auth/login", credentials);
    return { success: response.status === 200 };
  } catch (error) {
    return handleErrorResponse(error);
  }
};

const register = async (registerData) => {
  try {
    const response = await axios.post("/auth/register", registerData);
    return { success: response.status === 200 };
  } catch (error) {
    return handleErrorResponse(error);
  }
};

const logout = async () => {
  try {
    const response = await axios.post("/auth/logout");
    return { success: response.status === 200 };
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
