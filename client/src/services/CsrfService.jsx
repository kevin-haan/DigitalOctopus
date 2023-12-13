import axios from "axios";

const fetchCsrfToken = async () => {
  const response = await axios.get("csrf");
  return response.data.csrfToken;
};

export default {
  fetchCsrfToken,
};
