import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useDesignerData } from "../../context/Designer/DesignerDataContext";
import { useGuidedDesigner } from "../../context/Designer/GuidedDesignerContext";
import ListDropZone from "./FreeformDesigner/components/Lists/ListDropZone";
import DesignerGuide from "./DesignerGuide";
import DesignerProgress from "./DesignerProgress";
function Designer() {
  const { handleDragStart, handleDragEnd, selection } = useDesignerData();
  const { currentStep, isComplete } = useGuidedDesigner();

  // Definiere den Delay Constraint
  const delayConstraint = {
    delay: 200, // Verzögerung in Millisekunden
    tolerance: 5, // Bewegungstoleranz in Pixeln
  };

  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: delayConstraint,
  });
  const sensors = useSensors(
    mouseSensor,
    touchSensor,
    keyboardSensor,
    pointerSensor
  );
  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex h-screen w-screen overflow-clip flex-col bg-designer">
        <DesignerProgress />
        <DesignerGuide />
        {currentStep.stepType === "selection" && (
          <div className="mt-auto">
            <ListDropZone
              dropZoneData={{
                techType: currentStep.techType,
                dropZoneType: "list",
              }}
            />
          </div>
        )}
      </div>
    </DndContext>
  );
}

export default Designer;
