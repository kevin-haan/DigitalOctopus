import { useDroppable } from "@dnd-kit/core";
import { useDesignerData } from "../../context/DesignerDataContext";
export function DropZone(props) {
  const { currentDraggable } = useDesignerData();

  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
    data: props.data,
  });

  const isCompatible =
    (currentDraggable && currentDraggable.type) ===
    (props.data && props.data.type);

  const conditionalClasses = [
    isCompatible ? "shadow-xl" : "",
    isCompatible && isOver ? "scale-105" : "",
  ];

  const classNames = ["transition-all", ...conditionalClasses, props.className]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={setNodeRef} className={classNames}>
      {props.children}
    </div>
  );
}
export default DropZone;
