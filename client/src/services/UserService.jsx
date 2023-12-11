/* eslint-disable no-useless-catch */
import axios from "axios";

const getUserData = async () => {
  try {
    const response = await axios.get("/user");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  getUserData,
};
