import { createContext, useContext, useState, useEffect, useMemo } from "react";
import DesignerService from "../services/Designer/DesignerService";

const DesignerContext = createContext({});

export const useDesignerData = () => useContext(DesignerContext);

export const DesignerProvider = ({ children }) => {
  const [designerData, setDesignerData] = useState({
    availableApis: [],
    availableClients: [],
    availableCssFrameworks: [],
    availableDatabases: [],
    draggables: [],
    currentDraggable: null,
  });

  const draggableTypes = ["api", "client", "database", "cssFramework"];

  useEffect(() => {
    fetchDesignerData();
  }, []);

  const fetchDesignerData = async () => {
    try {
      const results = await Promise.all(
        draggableTypes.map(async (type) => {
          const items = await DesignerService.fetchAvailableDataByType(type);
          const draggables = items.map((item) => ({
            id: item.id,
            name: item.name,
            type,
            location: getInitialLocation(type),
          }));
          return { type, draggables };
        })
      );

      const draggables = {};

      results.forEach(({ type, draggables: items }) => {
        draggables[type] = items.reduce((acc, item) => {
          acc[item.id] = item;
          return acc;
        }, {});
      });

      setDesignerData((prevState) => ({
        ...prevState,
        draggables,
      }));
    } catch (error) {
      console.error("Fehler beim Laden der Designer-Daten", error);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    setDesignerData((prevState) => {
      if (!over) {
        return {
          ...prevState,
          currentDraggable: null,
        };
      }

      const updatedDraggables = { ...prevState.draggables };
      const draggableType = active.data.current.type;
      const dropzoneType = over.data.current.type;
      const draggableId = active.data.current.id;

      if (dropzoneType === draggableType) {
        updatedDraggables[draggableType][draggableId].location = over.id;
      }

      return {
        ...prevState,
        draggables: updatedDraggables,
        currentDraggable: null,
      };
    });
  };

  const handleDragStart = (event) => {
    const { current } = event.active.data;
    setDesignerData((prevState) => ({
      ...prevState,
      currentDraggable: current,
    }));
  };

  const getDraggablesByTypeAndLocation = (type, location) => {
    if (!designerData.draggables?.[type]) {
      return [];
    }

    return Object.values(designerData.draggables[type]).filter(
      (draggable) => draggable.type === type && draggable.location === location
    );
  };

  const getInitialLocation = (type) => {
    // Hier kannst du Logik hinzufügen, um zu überprüfen, ob es gespeicherte Konfigurationen gibt
    // Beispiel: return savedConfig[type] || `${type}List`;

    // Standardmäßig werden die Draggables in ihrer jeweiligen Liste positioniert
    return `${type}List`;
  };

  const contextValue = {
    ...designerData,
    getDraggablesByTypeAndLocation,
    draggableTypes,
    handleDragEnd,
    handleDragStart,
    setCurrentDraggable: (draggable) =>
      setDesignerData((prevState) => ({
        ...prevState,
        currentDraggable: draggable,
      })),
  };

  return (
    <DesignerContext.Provider value={contextValue}>
      {children}
    </DesignerContext.Provider>
  );
};
