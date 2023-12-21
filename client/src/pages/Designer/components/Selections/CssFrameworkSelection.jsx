import DropZone from "../../../../components/DragAndDrop/DropZone";
import Draggable from "../../../../components/DragAndDrop/Draggable";
import { useDesignerData } from "../../../../context/DesignerDataContext";

import SelectionDropZone from "./SelectionDropZone";

function CssFrameworkSelection() {
  return (
    <div className="h-full w-full">
      <h2>CSS</h2>
      <SelectionDropZone type="cssFramework" />
    </div>
  );
}

export default CssFrameworkSelection;
