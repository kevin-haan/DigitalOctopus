import { useDroppable } from "@dnd-kit/core";
import { useDesignerData } from "../../context/Designer/DesignerDataContext";
export function DropZone(props) {
  const { dropZoneData, className, id } = props;
  const { currentDraggable, isAnimating } = useDesignerData();

  const { isOver, setNodeRef } = useDroppable({
    id: id,
    data: dropZoneData,
  });

  const isCompatible =
    (currentDraggable && currentDraggable.techType) === dropZoneData.techType;

  const isSelectionDropZone = dropZoneData.dropZoneType === "selection";

  const conditionalClasses = [
    isCompatible && isSelectionDropZone ? "shadow-xl" : "",
    isCompatible && isOver && isSelectionDropZone ? "" : "",
  ];

  const classNames = [
    ` ${isAnimating && isSelectionDropZone ? "animation" : ""}`,
    "transition-all",
    "h-1/2",
    "w-1/2",
    ...conditionalClasses,
    props.className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={setNodeRef} className={classNames}>
      {props.children}
    </div>
  );
}
export default DropZone;
