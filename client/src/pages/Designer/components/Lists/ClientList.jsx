import React from "react";
import { DropZone } from "../../../../components/DragAndDrop/DropZone";
import { Draggable } from "../../../../components/DragAndDrop/Draggable";
import { useDesignerData } from "../../../../context/DesignerDataContext";

function ClientList() {
  const { clientDraggables, draggableLocations } = useDesignerData();

  return (
    <DropZone id="clientList">
      <div className="w-full bg-slate-50">
        {clientDraggables.map(
          (client) =>
            (!draggableLocations[client.id] ||
              draggableLocations[client.id] === "clientList") && (
              <Draggable key={client.id} id={client.id} data={client}>
                {client.name}
              </Draggable>
            )
        )}
      </div>
    </DropZone>
  );
}

export default ClientList;
