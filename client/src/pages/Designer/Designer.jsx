import { DndContext } from "@dnd-kit/core";
import { useDesignerData } from "../../context/DesignerDataContext";
import DesignerList from "./components/DesignerList";
import SelectionDropZone from "./components/Selections/SelectionDropZone";
function Designer() {
  const { handleDragStart, handleDragEnd, draggableTypes } = useDesignerData();

  const renderDraggableTypes = () => {
    return draggableTypes.map((type) => (
      <div key={type}>
        <h2>{type}</h2>
        <SelectionDropZone type={type} />
      </div>
    ));
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex h-screen w-screen overflow-hidden">
        <div className="flex-grow bg-designer flex">
          <div className="grid grid-cols-2 gap-20 m-auto h-80 w-full mx-20">
            {renderDraggableTypes()}
          </div>
        </div>
        <DesignerList />
      </div>
    </DndContext>
  );
}
export default Designer;
