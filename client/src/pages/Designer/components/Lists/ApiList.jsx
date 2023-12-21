import React from "react";
import { DropZone } from "../../../../components/DragAndDrop/DropZone";
import { Draggable } from "../../../../components/DragAndDrop/Draggable";
import { useDesignerData } from "../../../../context/DesignerDataContext";

function ApiList() {
  const { getDraggablesByTypeAndLocation } = useDesignerData();

  const draggables = getDraggablesByTypeAndLocation(
    type,
    "${type}SelectionDroppable"
  );

  return (
    <DropZone id="apiList">
      APIs
      <div className="w-full bg-slate-50">
        {apiDraggables.map(
          (api) =>
            // Nur die Draggables anzeigen, die sich aktuell in der Liste befinden
            (!draggableLocations[api.id] ||
              draggableLocations[api.id] === "apiList") && (
              <Draggable key={api.id} id={api.id} data={api}>
                {api.name}
              </Draggable>
            )
        )}
      </div>
    </DropZone>
  );
}

export default ApiList;
