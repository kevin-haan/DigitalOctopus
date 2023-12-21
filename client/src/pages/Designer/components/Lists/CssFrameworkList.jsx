import React from "react";
import { DropZone } from "../../../../components/DragAndDrop/DropZone";
import { Draggable } from "../../../../components/DragAndDrop/Draggable";
import { useDesignerData } from "../../../../context/DesignerDataContext";

function CssFrameworkList() {
  const { cssFrameworkDraggables, draggableLocations } = useDesignerData();
  const data = {
    type: "cssFramework",
  };

  return (
    <DropZone id="cssFrameworkList" data={data}>
      <div className="w-full bg-slate-50">
        {cssFrameworkDraggables.map(
          (cssFramework) =>
            (!draggableLocations[cssFramework.id] ||
              draggableLocations[cssFramework.id] === "cssFrameworkList") && (
              <Draggable
                key={cssFramework.id}
                id={cssFramework.id}
                data={cssFramework}
              >
                {cssFramework.name}
              </Draggable>
            )
        )}
      </div>
    </DropZone>
  );
}

export default CssFrameworkList;
