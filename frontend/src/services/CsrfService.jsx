import axios from "../config/axiosConfig";

const fetchCsrfToken = async () => {
  const response = await axios.get("csrf");
  return response.data.csrfToken;
};

export default {
  fetchCsrfToken,
};
