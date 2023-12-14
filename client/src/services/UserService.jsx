import axios from "../config/axiosConfig";

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
