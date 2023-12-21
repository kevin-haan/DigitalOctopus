import DropZone from "../../../../components/DragAndDrop/DropZone";
import Draggable from "../../../../components/DragAndDrop/Draggable";
import { useDesignerData } from "../../../../context/DesignerDataContext";
import { useMemo } from "react";

function ListDropZone({ type }) {
  const { getDraggablesByTypeAndLocation } = useDesignerData();

  const draggables = getDraggablesByTypeAndLocation(type, `${type}List`);

  const draggableElements = draggables.map((draggable) => (
    <Draggable key={draggable.id} id={draggable.id} data={draggable}>
      {draggable.name}
    </Draggable>
  ));

  return (
    <DropZone id={`${type}List`} className="h-full w-full" data={{ type }}>
      <div className="w-full h-full backdrop-blur-sm shadow-xl rounded-3xl">
        {draggableElements}
      </div>
    </DropZone>
  );
}

export default ListDropZone;
