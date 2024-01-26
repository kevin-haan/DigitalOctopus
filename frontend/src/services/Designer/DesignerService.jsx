import axios from "../../config/axiosConfig";
import { getInitialLocation } from "../../utils/Designer/designerUtils";
import { handleErrorResponse } from "../../utils/serviceUtils";

const fetchDesignerData = async (techTypes) => {
  try {
    const results = await Promise.all(
      techTypes.map(async (techType) => {
        const items = await fetchAvailableDataByType(techType);
        const draggables = items.map((item) => ({
          id: item.id,
          name: item.name,
          logo: item.logo,
          description: item.description,
          techType,
          options: item.options ? item.options : "",
          location: getInitialLocation(techType),
        }));
        return { techType, draggables };
      })
    );

    return results.reduce((acc, { techType, draggables }) => {
      const entries = draggables.map((item) => [item.id, item]);
      acc[techType] = Object.fromEntries(entries);
      return acc;
    }, {});
  } catch (error) {
    console.error("Failed to fetch designer data", error);
  }
};

const fetchAvailableDataByType = async (techType) => {
  try {
    const response = await axios.get(`designer/${techType}`);
    return response.data.items;
  } catch (error) {
    console.error(`Fehler beim Laden der Daten für ${techType}`, error);
    throw error;
  }
};

const submitDesignerData = async (selection) => {
  try {
    const data = {
      selection: selection,
    };
    const response = await axios.post("/designer", data);
    return { success: response.status === 200 };
  } catch (error) {
    return handleErrorResponse(error);
  }
};

export default {
  fetchDesignerData,
  submitDesignerData,
};
