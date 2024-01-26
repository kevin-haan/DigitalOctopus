import { useContext } from "react";
import { useDesignerData } from "../../context/Designer/DesignerDataContext";
import { useDraggable } from "@dnd-kit/core";
export function Draggable(props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id + props.data.techType,
    data: props.data,
  });

  const { isDragging } = useDesignerData();

  const cursorClass = isDragging ? "cursor-grabbing" : "cursor-grab";

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={(props.className, cursorClass)}
    >
      {props.children}
    </div>
  );
}
export default Draggable;
