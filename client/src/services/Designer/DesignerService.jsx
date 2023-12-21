import axios from "../../config/axiosConfig";

const fetchAvailableDataByType = async (type) => {
  try {
    const response = await axios.get(`designer/${type}`);
    return response.data.items;
  } catch (error) {
    console.error(`Fehler beim Laden der Daten für ${type}`, error);
    throw error;
  }
};

export default {
  fetchAvailableDataByType,
};
