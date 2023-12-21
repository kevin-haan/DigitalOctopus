import React from "react";
import { DropZone } from "../../../../components/DragAndDrop/DropZone";
import { Draggable } from "../../../../components/DragAndDrop/Draggable";
import { useDesignerData } from "../../../../context/DesignerDataContext";

function DatabaseList() {
  const { databaseDraggables, draggableLocations } = useDesignerData();
  return (
    <DropZone id="databaseList">
      <div className="w-full bg-slate-50">
        {databaseDraggables.map(
          (database) =>
            (!draggableLocations[database.id] ||
              draggableLocations[database.id] === "databaseList") && (
              <Draggable key={database.id} id={database.id} data={database}>
                {database.name}
              </Draggable>
            )
        )}
      </div>
    </DropZone>
  );
}

export default DatabaseList;
